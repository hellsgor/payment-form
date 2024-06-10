import { ControlComponent } from '../Control/Control';
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
    const controlInstance = new ControlComponent({
      name: 'payment-amount',
      required: true,
      hidden: true,
      className: 'form__control',
      value: `${this.paymentAmount}`,
    });
    const amountControl = controlInstance.control;
    this.controls.push(amountControl);
    this.$controls?.appendChild(amountControl.$control);

    if (this.$subButton) {
      this.$subButton.textContent += ` ${this.paymentAmount}$`;
    }
  }
}
