import IMask, { FactoryArg, InputMask } from 'imask/esm/index';

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
  // mask?: IMask;
  mask?: FactoryArg;
}

export interface IMaskProps {
  mask: string | Date;
  pattern?: string;
  blocks?: {
    m?: MaskBlock;
    y?: MaskBlock;
  };
  format?: string;
  parse?: Date;
  min?: Date;
  max?: Date;
  autofix?: boolean;
  lazy?: boolean;
  overwrite?: boolean;
}

export type MaskBlock = {
  mask: typeof IMask.MaskedRange;
  from: number;
  to: number;
  maxLength: number;
};

export type LabelProps = {
  labelText?: string;
};

export type ControlProps = InputProps & LabelProps;
