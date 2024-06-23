import { el, setChildren } from 'redom';
import { Validation } from '../../utils/Validation/Validation';
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
  validation: Validation | null = null;

  constructor(props: FormProps) {
    this.props = props;
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
        if (!this.validation) {
          this.validation = new Validation({
            validationEvents: this.props.form.validationEvents,
            correctCallback: this.makeCorrect.bind(this),
            incorrectCallback: this.makeIncorrect.bind(this),
          });
        }

        this.validation.prepareControlValidation(controlProps, control);
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

  makeIncorrect(): void {
    this.$form?.classList.remove('form_correct');
    this.$form?.classList.add('form_incorrect');
    if (this.$subButton && !this.$subButton.hasAttribute('disabled')) {
      this.$subButton.setAttribute('disabled', 'true');
    }
  }

  makeCorrect(): void {
    this.$subButton && this.$subButton.removeAttribute('disabled');
    this.$form?.classList.remove('form_incorrect');
    this.$form?.classList.add('form_correct');
  }
}
