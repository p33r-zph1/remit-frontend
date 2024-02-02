import { z } from 'zod';

import { makeApiSchema } from './api/fetch';
import { priceOracleSchema } from './price-oracle';

const currencySchema = z.object({
  icon: z.string(),
  currency: z.string(),
  countryIsoCode: z.string(),
});

export const exchangeCurrencySchema = z.object({
  supportedCurrencies: z.array(currencySchema),
  defaultSenderCurrency: currencySchema,
  defaultRecipientCurrency: currencySchema,
  priceOracle: priceOracleSchema,
});

const exchangeCurrencyApiSchema = makeApiSchema(exchangeCurrencySchema);

export type Currency = z.infer<typeof currencySchema>;

export type ExchangeCurrency = z.infer<typeof exchangeCurrencySchema>;

export default exchangeCurrencyApiSchema;
