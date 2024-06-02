export type ButtonProps = {
  text: string | null;
  type: string;
  classes: string;
};

export interface IButton {
  create(props: ButtonProps): HTMLButtonElement;
}
