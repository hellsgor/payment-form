import IMask, { FactoryArg } from 'imask';
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
        mask: {
          mask: '0000 0000 0000 0000 [00]',
        } as FactoryArg,
      },
      {
        type: 'text',
        name: 'date',
        required: true,
        autocomplete: 'cc-exp',
        placeholder: 'mm/yy',
        labelText: 'Expiration Date',
        inputmode: 'numeric',
        mask: {
          mask: Date,
          pattern: 'MM{/}YY',
          blocks: {
            MM: {
              mask: IMask.MaskedRange,
              from: 1,
              to: 12,
              maxLength: 2,
            },
            YY: {
              mask: IMask.MaskedRange,
              from: 0,
              to: 99,
              maxLength: 2,
            },
          },
          format: (date: Date): string => {
            const month = date.getMonth() + 1;
            const year = date.getFullYear() % 100;
            return [
              month < 10 ? '0' + month : month,
              year < 10 ? '0' + year : year,
            ].join('/');
          },
          parse: (str: string): Date => {
            const [month, year] = str
              .split('/')
              .map((item) => parseInt(item, 10));
            return new Date(2000 + year!, month! - 1);
          },
          autofix: true,
          lazy: true,
          overwrite: true,
        } as FactoryArg,
      },
      {
        type: 'text',
        name: 'code',
        required: true,
        autocomplete: 'cc-csc',
        placeholder: '000',
        labelText: 'CVC/CVV',
        inputmode: 'numeric',
        mask: {
          mask: '000',
        } as FactoryArg,
      },
      {
        type: 'email',
        name: 'email',
        required: true,
        autocomplete: 'email',
        placeholder: 'Email for check',
        labelText: 'Email',
        // mask: '',
      },
    ],
    button: {
      text: 'Pay',
    },
  },
};
