import { ZodObject, ZodRawShape } from 'zod';
import { ControlProps, IControl } from '../../components/Control/Control.types';

export interface IValidation {
  schema: ZodObject<ZodRawShape>;
  validationEvents: Array<keyof HTMLElementEventMap>;
  controls: Array<IControl>;
  correctCallback: CorrectCallback;
  incorrectCallback: IncorrectCallback;

  extendSchema(controlProps: Omit<ControlProps, 'className'>): void;
  addValidationEvents(control: IControl): void;
  prepareControlValidation(
    controlProps: Omit<ControlProps, 'className'>,
    control: IControl,
  ): void;
  validate(event: Event): void;
}

export type CorrectCallback = () => void;
export type IncorrectCallback = () => void;
