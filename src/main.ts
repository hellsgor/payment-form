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
    },
  ],
  button: {
    text: 'Pay',
  },
});

mount(app, paymentForm.form);
mount(document.body, app);
