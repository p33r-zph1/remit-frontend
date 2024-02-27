import { z } from 'zod';

import { makeApiSchema } from './api/fetch';
import { orderTypeSchema } from './order';
import { priceOracleSchema } from './price-oracle';

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
  // .extend({
  //   })
  defaultSenderCurrency: currencySchema,
  defaultRecipientCurrency: currencySchema,
  priceOracle: priceOracleSchema,
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

export default exchangeCurrencyApiSchema;
