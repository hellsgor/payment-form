import { ControlProps } from '../components/Control/Control.types';
import { validationTypes } from '../services/Validation/Validation.types';
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
  validationType: validationTypes.cardNumber,
  mask: maskConfigs.get('card-number'),
});

controls.set(controlsTypes.expirationDate, {
  type: 'text',
  name: 'date',
  required: true,
  autocomplete: 'cc-exp',
  placeholder: '00/00',
  labelText: 'Expiration Date',
  inputmode: 'numeric',
  validationType: validationTypes.expirationDate,
  mask: maskConfigs.get('card-date'),
});

controls.set(controlsTypes.cardSecurityCode, {
  type: 'text',
  name: 'code',
  required: true,
  autocomplete: 'cc-csc',
  placeholder: '000',
  labelText: 'CVC/CVV',
  inputmode: 'numeric',
  validationType: validationTypes.cardSecurityCode,
  mask: maskConfigs.get('card-security-code'),
});

controls.set(controlsTypes.email, {
  type: 'email',
  name: 'email',
  required: true,
  autocomplete: 'email',
  placeholder: 'Email for check',
  labelText: 'Email',
  validationType: validationTypes.email,
});
