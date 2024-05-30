export type FormProps = {
  form: {
    name: string;
  };
  title?: string;
  controls: number[];
  button: {
    text: string;
  };
};

export interface IForm {
  $form: HTMLFormElement | null;
  $title: HTMLHeadingElement | null;
  $subButton: HTMLButtonElement | null;
  $controls: HTMLDivElement | null;
  props: FormProps;
  form: HTMLFormElement;

  create(): void;
}
