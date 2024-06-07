import { FormProps } from '../components/Form/Form.types';
import { Config } from '../types/configs';
import { maskConfigs } from './masks';

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
        placeholder: '0000 0000 0000 0000 00',
        labelText: 'Card number',
        inputmode: 'numeric',
        mask: maskConfigs.get('card-number'),
      },
      {
        type: 'text',
        name: 'date',
        required: true,
        autocomplete: 'cc-exp',
        placeholder: '00/00',
        labelText: 'Expiration Date',
        inputmode: 'numeric',
        mask: maskConfigs.get('card-date'),
      },
      {
        type: 'text',
        name: 'code',
        required: true,
        autocomplete: 'cc-csc',
        placeholder: '000',
        labelText: 'CVC/CVV',
        inputmode: 'numeric',
        mask: maskConfigs.get('card-security-code'),
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
  },
};
