import { ZodObject, ZodRawShape, z } from 'zod';
import {
  ControlProps,
  IControl,
  IControlWithTouched,
} from '../../components/Control/Control.types';
import {
  CorrectCallback,
  IValidation,
  IncorrectCallback,
} from './Validation.types';

export class Validation implements IValidation {
  schema: ZodObject<ZodRawShape> = z.object({});
  validationEvents: Array<keyof HTMLElementEventMap>;
  controls: Array<IControlWithTouched> = [];
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

  addValidationEvents(control: IControlWithTouched): void {
    this.validationEvents.forEach((eventType) => {
      control.$input.addEventListener(eventType, (event) => {
        this.validate(event);
      });
    });

    control.$input.addEventListener('focus', () => {
      control.isTouched = true;
    });
  }

  prepareControlValidation(
    controlProps: Omit<ControlProps, 'className'>,
    control: IControl,
  ): void {
    this.extendSchema(controlProps);

    const tempControl: IControlWithTouched = { ...control, isTouched: false };
    this.addValidationEvents(tempControl);

    this.controls.push(tempControl);
  }

  validate(event: Event): void {
    const target = event.target as HTMLInputElement;
    const controlsValues = this.getControlsValues();

    const validationResult = this.schema.safeParse(controlsValues);

    if (!validationResult.success) {
      if (this.controls.every((control) => control.isTouched === true)) {
        this.incorrectCallback();
      }

      validationResult.error.format()[target.name]?._errors[0] &&
        this.showError(
          validationResult.error.format()[target.name]!._errors[0]!,
          target.name,
        );
    } else {
      this.correctCallback();
    }
  }

  showError(errorText: string, targetControlName: string): void {
    const control = this.controls.find(
      (control) => control.$input.name === targetControlName,
    );
    const $error = control!.$error;

    if (!$error || !errorText) {
      return;
    }

    $error.textContent = errorText;
    control!.$control.classList.add('control_with-error');
  }

  getControlsValues(): Record<string, string> {
    return this.controls.reduce((values, control) => {
      if (!control.$input.name || !control.$input) {
        return values;
      }
      return { ...values, [control.$input.name]: control.$input.value };
    }, {});
  }
}
