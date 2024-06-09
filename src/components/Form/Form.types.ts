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
  validationEvents: Array<keyof HTMLElementEventMap>;

  create(): void;
}
