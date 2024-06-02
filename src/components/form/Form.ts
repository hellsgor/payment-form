import './Form.scss';
import { FormProps, IForm } from './Form.types';
import { el, setChildren } from 'redom';
import { ButtonInstance } from '../button/Button';
import { controlInstance } from '../Control/Control';

export class FormComponent implements IForm {
  props: FormProps;
  $form: HTMLFormElement | null = null;
  $title: HTMLHeadingElement | null = null;
  $subButton: HTMLButtonElement | null = null;
  $controls: HTMLDivElement | null = null;

  constructor(props: FormProps) {
    this.props = props;
  }

  get form(): HTMLFormElement {
    !this.$form && this.create();
    return this.$form!;
  }

  create(): void {
    const children: Array<HTMLElement | HTMLDivElement | HTMLButtonElement> =
      [];

    if (this.props.title) {
      this.$title = el('h2', { className: 'form__heading' }, this.props.title);
      children.push(this.$title);
    }

    this.$controls = el('div', { className: 'form__controls' });
    this.props.controls.forEach((controlProps) => {
      this.$controls?.appendChild(
        controlInstance.create({
          ...controlProps,
          className: 'form__control',
        }),
      );
    });
    children.push(this.$controls);

    this.$subButton = ButtonInstance.create({
      text: this.props.button.text || null,
      type: 'submit',
      classes: `form__button${
        this.props.button.classes ? ' ' + this.props.button.classes : ''
      }`,
    });
    this.$subButton && children.push(this.$subButton);

    this.$form = el('form', { name: this.props.form.name, className: 'form' });
    setChildren(this.$form, children);
  }
}
