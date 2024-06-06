import { controlInstance } from '../Control/Control';
import { FormComponent } from '../Form/Form';
import { FormProps } from '../Form/Form.types';
import { IPaymentForm } from './PaymentForm.types';

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
    const amountControl = controlInstance.create({
      name: 'payment-amount',
      required: true,
      hidden: true,
      className: 'form__control',
      value: `${this.paymentAmount}`,
    });
    this.controls.push(amountControl);
    this.$controls?.appendChild(amountControl.$controlElem);

    if (this.$subButton) {
      this.$subButton.textContent += ` ${this.paymentAmount}$`;
    }
  }
}
