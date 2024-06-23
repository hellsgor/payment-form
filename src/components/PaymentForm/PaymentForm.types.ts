import { IForm } from '../Form/Form.types';

export interface IPaymentForm extends IForm {
  paymentAmount: number | string;

  setAmountValue(): void;
}
