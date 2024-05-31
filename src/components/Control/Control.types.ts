export interface InputProps {
  className: string;
  type: string;
  name: string;
  required?: boolean;
  autocomplete?: string;
  placeholder?: string;
  id?: string;
}

export type LabelProps = {
  labelText?: string;
};

export type ControlProps = InputProps & LabelProps;
