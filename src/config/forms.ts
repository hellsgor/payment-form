import { FormProps } from '../components/Form/Form.types';
import { Config } from '../types/configs';
import { controls, controlsTypes } from './controls';

export const formsConfig: Config<FormProps> = {
  paymentForm: {
    form: {
      name: 'payment',
    },
    title: 'Payment form',
    controls: [
      controlsTypes.cardNumber,
      controlsTypes.expirationDate,
      controlsTypes.cardSecurityCode,
      controlsTypes.email,
    ]
      .filter((controlType) => controls.has(controlType))
      .map((controlType) => controls.get(controlType)!),
    button: {
      text: 'Pay',
    },
  },
};
