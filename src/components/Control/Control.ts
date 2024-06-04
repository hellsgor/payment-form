import IMask, { InputMask } from 'imask';
import { el, setChildren } from 'redom';
import './Control.scss';
import { ControlProps, IControl, InputProps } from './Control.types';

class ControlComponent {
  create(props: ControlProps): IControl {
    let mask: null | InputMask = null;

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

      const input = el('input', inputProps);
      mask = props.mask ? IMask(input, { mask: props.mask }) : null;

      return input;
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

    const control: IControl = {
      $controlElem: el('div', {
        className: props.hidden
          ? `${props.className} control control_hidden`
          : `${props.className} control`,
      }),
      mask: mask,
    };

    const controlChildrenArray: HTMLElement[] = [createInput()];
    if (props.labelText) controlChildrenArray.push(createLabel());
    if (!props.hidden) controlChildrenArray.push(createErrorBlock());
    setChildren(control.$controlElem, controlChildrenArray);

    return control;
  }
}

export const controlInstance: ControlComponent = new ControlComponent();
