enum validationTypesEnum {
  cardNumber = 'cardNumber',
  expirationDate = 'expirationDate',
  cardSecurityCode = 'cardSecurityCode',
  email = 'email',
}

export const validationTypes = {
  cardNumber: validationTypesEnum.cardNumber,
  expirationDate: validationTypesEnum.expirationDate,
  cardSecurityCode: validationTypesEnum.cardSecurityCode,
  email: validationTypesEnum.email,
} as const;

export type validationType = keyof typeof validationTypesEnum;

export type ValidationProps = {
  validationEventType: keyof HTMLElementEventMap;
};
