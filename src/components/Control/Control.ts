import IMask, { FactoryArg } from 'imask';
import { el, setChildren } from 'redom';
import './Control.scss';
import { ControlProps, IControl, InputProps } from './Control.types';

export class ControlComponent {
  protected props: ControlProps;
  protected _control: IControl | undefined;

  constructor(props: ControlProps) {
    this.props = props;
    this._control = undefined;
  }

  get control(): IControl {
    if (!this._control) {
      this._control = this.create();
    }

    return this._control;
  }

  protected create(): IControl {
    const id: string | null =
      !this.props.id || this.props.labelText
        ? `random-id-${(Math.random() * 10000).toFixed(0)}`
        : null;

    const $input = this.createInput(id);

    const control = {
      $control: el('div', {
        className: this.props.hidden
          ? `${this.props.className} control control_hidden`
          : `${this.props.className} control`,
      }),
      $label: this.props.labelText && id ? this.createLabel(id) : null,
      $error: this.props.hidden ? null : this.createErrorBlock(),
      mask: this.props.mask
        ? IMask($input, this.props.mask as FactoryArg)
        : null,
      $input,
    };

    control.$input.addEventListener('input', () => {
      this.clearError();
    });

    const controlChildrenArray: HTMLElement[] = [control.$input];
    if (control.$label) controlChildrenArray.push(control.$label);
    if (control.$error) controlChildrenArray.push(control.$error);
    setChildren(control.$control, controlChildrenArray);

    return control;
  }

  protected createInput(id: string | null): HTMLInputElement {
    const inputProps: InputProps = {
      className: 'control__input',
      type: this.props.type ? this.props.type : 'text',
      name: this.props.name,
    };

    if (this.props.required) inputProps.required = true;
    if (this.props.autocomplete)
      inputProps.autocomplete = this.props.autocomplete;
    if (this.props.placeholder) inputProps.placeholder = this.props.placeholder;
    if (this.props.inputmode) inputProps.inputmode = this.props.inputmode;
    if (this.props.hidden) inputProps.hidden = this.props.hidden;
    if (this.props.value) inputProps.value = this.props.value;
    if (id) inputProps.id = id;

    return el('input', inputProps);
  }

  protected createErrorBlock(): HTMLParagraphElement {
    return el('p', { className: 'control__error' });
  }

  protected createLabel(id: string): HTMLLabelElement {
    const labelElem: HTMLLabelElement = el('label', {
      className: 'control__label',
      for: id,
    });
    setChildren(labelElem, [el('span', {}, this.props.labelText!)]);
    return labelElem;
  }

  protected clearError(): void {
    if (this._control) {
      if (this._control?.$error) {
        this._control.$error.textContent = '';
      }

      this._control.$control.classList.remove('control_with-error');
    }
  }
}
