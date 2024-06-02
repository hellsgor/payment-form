export interface InputProps {
  className: string;
  type: string;
  name: string;
  required?: boolean;
  autocomplete?: string;
  placeholder?: string;
  id?: string;
  inputmode?: string;
}

export type LabelProps = {
  labelText?: string;
};

export type ControlProps = InputProps & LabelProps;
