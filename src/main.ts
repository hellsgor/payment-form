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
  controls: [1, 2, 3],
  button: {
    text: 'Pay',
  },
});

mount(app, paymentForm.form);
mount(document.body, app);
