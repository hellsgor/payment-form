import { ZodObject, ZodRawShape, z } from 'zod';
import { ControlProps, IControl } from '../../components/Control/Control.types';
import {
  CorrectCallback,
  IValidation,
  IncorrectCallback,
} from './Validation.types';

export class Validation implements IValidation {
  schema: ZodObject<ZodRawShape> = z.object({});
  validationEvents: Array<keyof HTMLElementEventMap>;
  controls: Array<IControl> = [];
  correctCallback: CorrectCallback;
  incorrectCallback: IncorrectCallback;

  constructor(props: {
    validationEvents: Array<keyof HTMLElementEventMap>;
    correctCallback: CorrectCallback;
    incorrectCallback: IncorrectCallback;
  }) {
    this.validationEvents = [...props.validationEvents, 'change'];
    this.correctCallback = props.correctCallback;
    this.incorrectCallback = props.incorrectCallback;
  }

  extendSchema(controlProps: Omit<ControlProps, 'className'>): void {
    this.schema = this.schema.extend({
      [controlProps.name]: controlProps.schema!,
    });
  }

  addValidationEvents(control: IControl): void {
    this.validationEvents.forEach((eventType) => {
      control.$input.addEventListener(eventType, (event) => {
        this.validate(event);
      });
    });
  }

  prepareControlValidation(
    controlProps: Omit<ControlProps, 'className'>,
    control: IControl,
  ): void {
    this.extendSchema(controlProps);
    this.addValidationEvents(control);

    this.controls.push(control);
  }

  validate(event: Event): void {
    const target = event.target as HTMLInputElement;
    let controlsValues = {};

    this.controls.forEach((control) => {
      controlsValues = {
        ...controlsValues,
        [control.$input.name]: control.$input.value,
      };
    });

    const validationResult = this.schema.safeParse(controlsValues);

    if (!validationResult.success) {
      this.incorrectCallback();

      const control = this.controls.find(
        (control) => control.$input.name === target.name,
      );
      const $error = control!.$error;

      const errorText =
        validationResult.error.format()[target.name]?._errors[0];

      if (!$error || !errorText) {
        return;
      }

      $error.textContent = errorText;
      control!.$control.classList.add('control_with-error');
    } else {
      this.correctCallback();
    }
  }
}
