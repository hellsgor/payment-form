import { el, setChildren } from 'redom';
import { ZodObject, ZodRawShape, z } from 'zod';
import { ButtonInstance } from '../Button/Button';
import { ControlComponent } from '../Control/Control';
import { IControl } from '../Control/Control.types';
import './Form.scss';
import { FormProps, IForm } from './Form.types';

export class FormComponent implements IForm {
  props: FormProps;
  $form: HTMLFormElement | null = null;
  $title: HTMLHeadingElement | null = null;
  $subButton: HTMLButtonElement | null = null;
  $controls: HTMLDivElement | null = null;
  controls: IControl[] = [];
  schema: ZodObject<ZodRawShape> = z.object({});
  validationEvents: Array<keyof HTMLElementEventMap>;

  constructor(props: FormProps) {
    this.props = props;
    this.validationEvents = [...props.form.validationEvents, 'change'];
    this.create();
  }

  get form(): HTMLFormElement {
    return this.$form!;
  }

  create(): void {
    const children: Array<HTMLDivElement | HTMLButtonElement> = [];

    if (this.props.title) {
      this.$title = el('h2', { className: 'form__heading' }, this.props.title);
      children.push(this.$title);
    }

    this.$controls = el('div', { className: 'form__controls' });

    this.props.controls.forEach((controlProps) => {
      const controlInstance = new ControlComponent({
        ...controlProps,
        className: 'form__control',
      });
      const control: IControl = controlInstance.control;

      if (controlProps.schema) {
        this.schema = this.schema.extend({
          [controlProps.name]: controlProps.schema,
        });

        this.validationEvents.forEach((eventType) => {
          control.$input.addEventListener(eventType, (event) => {
            this.validate(event);
          });
        });
      }

      this.$controls?.appendChild(control.$control);
      this.controls.push(control);
    });
    children.push(this.$controls);

    this.$subButton = ButtonInstance.create({
      text: this.props.button.text || null,
      type: 'submit',
      classes: `form__button${
        this.props.button.classes ? ' ' + this.props.button.classes : ''
      }`,
      disabled: true,
    });
    this.$subButton && children.push(this.$subButton);

    this.$form = el('form', { name: this.props.form.name, className: 'form' });
    setChildren(this.$form, children);
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
      this.$form?.classList.remove('form_correct');
      this.$form?.classList.add('form_incorrect');
      if (this.$subButton && !this.$subButton.hasAttribute('disabled')) {
        this.$subButton.setAttribute('disabled', 'true');
      }

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
      this.$subButton && this.$subButton.removeAttribute('disabled');
      this.$form?.classList.remove('form_incorrect');
      this.$form?.classList.add('form_correct');
    }
  }
}
