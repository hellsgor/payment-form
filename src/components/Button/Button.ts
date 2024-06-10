import { el } from 'redom';
import './Button.scss';
import { ButtonProps, IButton } from './Button.types';

class ButtonComponent implements IButton {
  create(props: ButtonProps): HTMLButtonElement {
    return el(
      'button',
      {
        className: `${props.classes} button`,
        type: props.type,
        disabled: props.disabled ? props.disabled : false,
      },
      props.text || '',
    );
  }
}

export const ButtonInstance: ButtonComponent = new ButtonComponent();
