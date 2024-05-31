import { el, setChildren } from 'redom';
import { ControlProps, InputProps } from './Control.types';

class ControlComponent {
  create(props: ControlProps): HTMLDivElement {
    const id: string | null =
      props.id || props.labelText ? `random-id-${Math.random() * 1000}` : null;

    const createInput = (): HTMLInputElement => {
      const inputProps: InputProps = {
        className: 'control__input',
        type: props.type ? props.type : 'text',
        name: props.name,
      };

      if (props.required) inputProps.required = true;
      if (props.autocomplete) inputProps.autocomplete = props.autocomplete;
      if (props.placeholder) inputProps.placeholder = props.placeholder;
      if (id) inputProps.placeholder = id;

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

    const control: HTMLDivElement = el('div', { className: 'control' });
    setChildren(
      control,
      props.labelText
        ? [createLabel(), createInput(), createErrorBlock()]
        : [createInput(), createErrorBlock()],
    );
    return control;
  }
}

export const controlInstance = new ControlComponent();
