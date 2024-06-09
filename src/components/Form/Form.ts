import { el, setChildren } from 'redom';
import { ZodObject, ZodRawShape, z } from 'zod';
import { ButtonInstance } from '../Button/Button';
import { controlInstance } from '../Control/Control';
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
      const control: IControl = controlInstance.create({
        ...controlProps,
        className: 'form__control',
      });

      if (controlProps.schema) {
        this.schema = this.schema.extend({
          [controlProps.name]: controlProps.schema,
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
}
