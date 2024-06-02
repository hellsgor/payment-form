import { Config } from '../types/configs';
import { FormProps } from '../components/Form/Form.types';

export const formsConfig: Config<FormProps> = {
  paymentForm: {
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
      {
        name: 'payment-amount',
        required: true,
        hidden: true,
      },
    ],
    button: {
      text: 'Pay',
    },
  },
};
