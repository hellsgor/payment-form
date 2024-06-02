import './styles/index.scss';
import { el, mount } from 'redom';
import { FormComponent } from './components/form/Form';
import { IForm } from './components/form/Form.types';
import { formsConfig } from './config/forms';

let paymentForm: IForm | null = null;
const app = el('#app');

if (formsConfig['paymentForm']) {
  paymentForm = new FormComponent(formsConfig['paymentForm']);
  mount(app, paymentForm.form);
  mount(document.body, app);
}
