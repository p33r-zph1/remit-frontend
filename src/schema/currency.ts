import { z } from 'zod';
import { makeApiSchema } from './api/fetch';

const currencySchema = z.object({
  icon: z.string(),
  currency: z.string(),
});

const schema = z.object({
  recipient: z.array(currencySchema),
  sender: z.array(currencySchema),
});

const exchangeCurrencySchema = makeApiSchema(schema);

export type Currency = z.infer<typeof currencySchema>;

export type ExchangeCurrency = z.infer<typeof schema>;

export default exchangeCurrencySchema;
