import './styles/index.scss';
import { el, mount } from 'redom';
import { FormComponent } from './components/form/Form';
import { IForm } from './components/form/Form.types';

const app = el('#app');
const paymentForm: IForm = new FormComponent({
  form: {
    name: 'payment',
  },
  title: 'Payment form',
  controls: [
    {
      type: 'number',
      name: 'number',
      required: true,
      autocomplete: 'cc-number',
      placeholder: 'XXXX-XXXX-XXXX-XXXX',
      labelText: 'Card number',
      inputmode: 'numeric',
    },
    {
      type: 'text',
      name: 'expiration-date',
      required: true,
      autocomplete: 'cc-exp',
      placeholder: 'MM/YY',
      labelText: 'Expiration Date',
      inputmode: 'numeric',
    },
    {
      type: 'number',
      name: 'code',
      required: true,
      autocomplete: 'cc-csc',
      placeholder: 'XXX',
      labelText: 'CVC/CVV',
      inputmode: 'numeric',
    },
    {
      type: 'email',
      name: 'email',
      required: true,
      autocomplete: 'email',
      placeholder: 'Email for check',
      labelText: 'Email',
    },
  ],
  button: {
    text: 'Pay',
  },
});

mount(app, paymentForm.form);
mount(document.body, app);
