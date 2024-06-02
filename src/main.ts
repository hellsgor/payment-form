import './styles/index.scss';
import { el, mount } from 'redom';
import { formsConfig } from './config/forms';
import { IPaymentForm } from './components/PaymentForm/PaymentForm.types';
import { PaymentFormComponent } from './components/PaymentForm/PaymentForm';

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
