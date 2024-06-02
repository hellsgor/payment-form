import { IPaymentForm } from './PaymentForm.types';
import { FormComponent } from '../Form/Form';
import { controlInstance } from '../Control/Control';
import { FormProps } from '../Form/Form.types';

export class PaymentFormComponent
  extends FormComponent
  implements IPaymentForm
{
  paymentAmount;

  constructor(props: FormProps, paymentAmount: number | string) {
    super(props);
    this.paymentAmount = paymentAmount;
    this.setAmountValue();
  }

  setAmountValue(): void {
    this.$controls?.appendChild(
      controlInstance.create({
        name: 'payment-amount',
        required: true,
        hidden: true,
        className: 'form__control',
        value: `${this.paymentAmount}`,
      }),
    );

    if (this.$subButton) {
      this.$subButton.textContent += ` ${this.paymentAmount}$`;
    }
  }
}
