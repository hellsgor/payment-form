import { z } from 'zod';
import { ControlProps } from '../components/Control/Control.types';
import { maskConfigs } from './masks';

enum controlsTypesEnum {
  cardNumber = 'cardNumber',
  expirationDate = 'expirationDate',
  cardSecurityCode = 'cardSecurityCode',
  email = 'email',
}

export type ControlTypes = keyof typeof controlsTypesEnum;

export const controlsTypes = {
  cardNumber: controlsTypesEnum.cardNumber,
  expirationDate: controlsTypesEnum.expirationDate,
  cardSecurityCode: controlsTypesEnum.cardSecurityCode,
  email: controlsTypesEnum.email,
};

export const controls = new Map<
  ControlTypes,
  Omit<ControlProps, 'className'>
>();

controls.set(controlsTypes.cardNumber, {
  type: 'text',
  name: 'number',
  required: true,
  autocomplete: 'cc-number',
  placeholder: '0000 0000 0000 0000 00',
  labelText: 'Card number',
  inputmode: 'numeric',
  mask: maskConfigs.get('card-number'),
  schema: z
    .string()
    .regex(
      /^(?:\d{4} ){3}\d{4}$|^(?:\d{4} ){4}\d{2}$/,
      'Card number must be 16 or 18 digits',
    ),
});

controls.set(controlsTypes.expirationDate, {
  type: 'text',
  name: 'date',
  required: true,
  autocomplete: 'cc-exp',
  placeholder: '00/00',
  labelText: 'Expiration Date',
  inputmode: 'numeric',
  mask: maskConfigs.get('card-date'),
  schema: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format')
    .refine((date) => {
      const [month, year] = date.split('/').map(Number);

      if (!month || !year) {
        return false;
      }

      if (year > new Date().getFullYear() % 100) {
        return true;
      }

      if (
        year === new Date().getFullYear() % 100 &&
        month >= new Date().getMonth() + 1
      ) {
        return true;
      }

      return false;
    }, 'Expiry date must be in the future'),
});

controls.set(controlsTypes.cardSecurityCode, {
  type: 'text',
  name: 'code',
  required: true,
  autocomplete: 'cc-csc',
  placeholder: '000',
  labelText: 'CVC/CVV',
  inputmode: 'numeric',
  mask: maskConfigs.get('card-security-code'),
  schema: z.string().regex(/^\d{3}$/, 'CVC/CVV must be 3 digits'),
});

controls.set(controlsTypes.email, {
  type: 'email',
  name: 'email',
  required: true,
  autocomplete: 'email',
  placeholder: 'Email for check',
  labelText: 'Email',
  schema: z.string().email('An incorrect email was introduced'),
});
