import { FormProps } from '../components/Form/Form.types';
import { Config } from '../types/configs';

export const formsConfig: Config<FormProps> = {
  paymentForm: {
    form: {
      name: 'payment',
    },
    title: 'Payment form',
    controls: [
      {
        type: 'text',
        name: 'number',
        required: true,
        autocomplete: 'cc-number',
        placeholder: '0000 0000 0000 0000',
        labelText: 'Card number',
        inputmode: 'numeric',
        mask: '0000 0000 0000 0000 [00]',
      },
      {
        type: 'text',
        name: 'date',
        required: true,
        autocomplete: 'cc-exp',
        placeholder: 'mm/yy',
        labelText: 'Expiration Date',
        inputmode: 'numeric',
        mask: '00/00',
      },
      {
        type: 'text',
        name: 'code',
        required: true,
        autocomplete: 'cc-csc',
        placeholder: '000',
        labelText: 'CVC/CVV',
        inputmode: 'numeric',
        mask: '000',
      },
      {
        type: 'email',
        name: 'email',
        required: true,
        autocomplete: 'email',
        placeholder: 'Email for check',
        labelText: 'Email',
        mask: '',
      },
    ],
    button: {
      text: 'Pay',
    },
  },
};
