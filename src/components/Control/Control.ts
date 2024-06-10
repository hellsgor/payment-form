import IMask, { FactoryArg } from 'imask';
import { el, setChildren } from 'redom';
import './Control.scss';
import { ControlProps, IControl, InputProps } from './Control.types';

class ControlComponent {
  create(props: ControlProps): IControl {
    const id: string | null =
      props.id || props.labelText
        ? `random-id-${(Math.random() * 10000).toFixed(0)}`
        : null;

    const createInput = (): HTMLInputElement => {
      const inputProps: InputProps = {
        className: 'control__input',
        type: props.type ? props.type : 'text',
        name: props.name,
      };

      if (props.required) inputProps.required = true;
      if (props.autocomplete) inputProps.autocomplete = props.autocomplete;
      if (props.placeholder) inputProps.placeholder = props.placeholder;
      if (props.inputmode) inputProps.inputmode = props.inputmode;
      if (props.hidden) inputProps.hidden = props.hidden;
      if (props.value) inputProps.value = props.value;
      if (id) inputProps.id = id;

      return el('input', inputProps);
    };

    const createErrorBlock = (): HTMLParagraphElement =>
      el('p', { className: 'control__error' });

    const createLabel = (): HTMLLabelElement => {
      const labelElem: HTMLLabelElement = el('label', {
        className: 'control__label',
        for: id,
      });
      setChildren(labelElem, [el('span', {}, props.labelText!)]);
      return labelElem;
    };

    const $input = createInput();
    const control = {
      $control: el('div', {
        className: props.hidden
          ? `${props.className} control control_hidden`
          : `${props.className} control`,
      }),
      $label: props.labelText ? createLabel() : null,
      $error: props.hidden ? null : createErrorBlock(),
      mask: props.mask ? IMask($input, props.mask as FactoryArg) : null,
      $input,
    };

    control.$input.addEventListener('input', () => {
      if (control.$error && control.$error.textContent) {
        control.$error.textContent = '';
      }
    });

    const controlChildrenArray: HTMLElement[] = [control.$input];
    if (control.$label) controlChildrenArray.push(control.$label);
    if (control.$error) controlChildrenArray.push(control.$error);
    setChildren(control.$control, controlChildrenArray);

    return control;
  }
}

export const controlInstance: ControlComponent = new ControlComponent();
