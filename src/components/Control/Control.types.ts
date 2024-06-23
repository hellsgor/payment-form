import IMask, { FactoryArg, InputMask } from 'imask/esm/index';
import { ZodSchema } from 'zod';

export interface IControl {
  $control: HTMLDivElement;
  mask: InputMask<FactoryArg> | null;
  $input: HTMLInputElement;
  $label: HTMLLabelElement | null;
  $error: HTMLParagraphElement | null;
}

export type IControlWithTouched = IControl & {
  isTouched: boolean;
};

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
  mask?: FactoryArg;
  schema?: ZodSchema;
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
