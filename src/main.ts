import './styles/index.scss';
import { el, mount } from 'redom';
import { FormComponent } from './components/Form/Form';
import { IForm } from './components/Form/Form.types';
import { formsConfig } from './config/forms';

const paymentAmountInputName: string = 'payment-amount';
const paymentFormConfigKey: string = 'paymentForm';
const app = el('#app');

if (formsConfig['paymentForm']) {
  paymentForm = new FormComponent(formsConfig['paymentForm']);
let paymentForm: IForm | null = null;

if (formsConfig[paymentFormConfigKey]) {
  paymentForm = new FormComponent(formsConfig[paymentFormConfigKey]);
  mount(app, paymentForm.form);
  mount(document.body, app);
}
