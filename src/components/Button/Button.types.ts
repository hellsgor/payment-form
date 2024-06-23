export type ButtonProps = {
  text: string | null;
  type: string;
  classes: string;
  disabled?: boolean;
};

export interface IButton {
  create(props: ButtonProps): HTMLButtonElement;
}
