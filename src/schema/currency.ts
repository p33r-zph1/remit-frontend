import { numericFormatter } from 'react-number-format';
import { z } from 'zod';

import { makeApiSchema } from './api/fetch';
import { oracleSchema } from './oracle';
import { orderTypeSchema } from './order';

const fiatCurrencySchema = z.object({
  type: z.literal('fiat'),
  icon: z.string(),
  currency: z.string(),
  countryIsoCode: z.string(),
  precision: z.number(),
});

const tokenCurrencySchema = z.object({
  type: z.literal('token'),
  icon: z.string(),
  currency: z.string(),
});

const currencySchema = z.discriminatedUnion('type', [
  fiatCurrencySchema.extend({ type: z.literal('fiat') }),
  tokenCurrencySchema.extend({ type: z.literal('token') }),
]);

export const currencyConfigSchema = z.object({
  supportedCurrencies: z.array(currencySchema),
  supportedTokens: z.array(tokenCurrencySchema).optional(),
  defaultSenderCurrency: currencySchema,
  defaultRecipientCurrency: currencySchema,
  priceOracle: oracleSchema,
});

export const exchangeCurrencySchema = z.object({
  orderType: z.record(orderTypeSchema, currencyConfigSchema),
  _default: currencyConfigSchema,
});

const exchangeCurrencyApiSchema = makeApiSchema(exchangeCurrencySchema);

export type Currency = z.infer<typeof currencySchema>;

export type FiatCurrency = z.infer<typeof fiatCurrencySchema>;

export type TokenCurrency = z.infer<typeof tokenCurrencySchema>;

export type ExchangeCurrency = z.infer<typeof exchangeCurrencySchema>;

export function getIsoCode(
  from: Currency | undefined,
  to: Currency | undefined
) {
  if (from?.type === 'fiat') {
    return from.countryIsoCode;
  }
  if (to?.type === 'fiat') {
    return to.countryIsoCode;
  }

  throw new Error('Iso code not found.');
}

export function formatCurrencyAmount(
  fromAmount: string,
  toAmount: string,
  from: Currency | undefined,
  to: Currency | undefined
) {
  if (!from || !to) return '?';

  const formattedFrom = numericFormatter(`${fromAmount} ${from.currency}`, {
    thousandSeparator: ',',
  });

  const formattedTo = numericFormatter(`${toAmount} ${to.currency}`, {
    thousandSeparator: ',',
  });

  return `${formattedFrom} (${formattedTo})`;
}

export default exchangeCurrencyApiSchema;
