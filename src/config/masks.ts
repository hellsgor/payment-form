import IMask, { FactoryArg } from 'imask/esm/index';

export const maskConfigs = new Map<string, FactoryArg>();

maskConfigs.set('card-number', {
  mask: '0000 0000 0000 0000 [00]',
} as FactoryArg);

maskConfigs.set('card-date', {
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
    const [month, year] = str.split('/').map((item) => parseInt(item, 10));
    return new Date(2000 + year!, month! - 1);
  },
  autofix: true,
  lazy: true,
  overwrite: true,
} as FactoryArg);

maskConfigs.set('card-security-code', {
  mask: '000',
} as FactoryArg);
