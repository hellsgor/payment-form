import { InputMask } from 'imask/esm/index';

export interface IControl {
  $controlElem: HTMLDivElement;
  mask: null | InputMask;
}

export interface InputProps {
  className: string;
  type?: string;
  name: string;
  required?: boolean;
  autocomplete?: string;
  placeholder?: string;
  id?: string;
  inputmode?: string;
  hidden?: boolean;
  value?: number | string;
  mask?: string;
}

export type LabelProps = {
  labelText?: string;
};

export type ControlProps = InputProps & LabelProps;
