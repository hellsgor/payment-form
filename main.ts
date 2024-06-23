import { el, mount } from 'redom';
import { PaymentFormComponent } from './src/components/PaymentForm/PaymentForm';
import { IPaymentForm } from './src/components/PaymentForm/PaymentForm.types';
import { formsConfig } from './src/config/forms';
import './src/styles/index.scss';

const paymentFormConfigKey: string = 'paymentForm';
const app = el('#app');

let paymentForm: IPaymentForm | null = null;

if (formsConfig[paymentFormConfigKey]) {
  paymentForm = new PaymentFormComponent(
    formsConfig[paymentFormConfigKey],
    99.99,
  );
  mount(app, paymentForm.form);
  mount(document.body, app);
}
