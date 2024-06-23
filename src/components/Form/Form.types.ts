import { Validation } from '../../utils/Validation/Validation';
import { ControlProps, IControl } from '../Control/Control.types';

export type FormProps = {
  form: {
    name: string;
    validationEvents: Array<keyof HTMLElementEventMap>;
  };
  title?: string;
  controls: Omit<ControlProps, 'className'>[];
  button: {
    text?: string;
    type?: string;
    classes?: string;
  };
};

export interface IForm {
  $form: HTMLFormElement | null;
  $title: HTMLHeadingElement | null;
  $subButton: HTMLButtonElement | null;
  $controls: HTMLDivElement | null;
  props: FormProps;
  form: HTMLFormElement;
  controls: IControl[];
  validation: Validation | null;

  create(): void;
  makeIncorrect(): void;
  makeCorrect(): void;
}
