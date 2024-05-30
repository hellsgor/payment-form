import { FormProps, IForm } from './Form.types';
import { el, setChildren } from 'redom';

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
    const children: Array<HTMLElement | HTMLDivElement> = [];

    if (this.props.title) {
      this.$title = el('h2', { className: 'form__heading' }, this.props.title);
      children.push(this.$title);
    }

    this.$controls = el('div', { className: 'form__controls' });
    this.props.controls.forEach((control) => {
      this.$controls?.appendChild(
        el('input', {
          name: control,
          className: 'form__control',
        }),
      );
    });
    children.push(this.$controls);

    this.$subButton = el(
      'button',
      {
        type: 'submit',
        className: 'form__submit-button',
      },
      this.props.button.text,
    );
    children.push(this.$subButton);

    this.$form = el('form', { name: this.props.form.name, className: 'form' });
    setChildren(this.$form, children);
  }
}
