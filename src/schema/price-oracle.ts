import { z } from 'zod';

import { makeApiSchema } from './api/fetch';

type Pair = `${string}:${string}`;

const isValidPair = (data: string): data is Pair =>
  data.split(':').length === 2;

export const priceOracleSchema = z.object({
  pair: z.string().refine(isValidPair),
  rate: z.number(),
});

const priceOracleApiSchema = makeApiSchema(priceOracleSchema);

export type PriceOracle = z.infer<typeof priceOracleSchema>;

export default priceOracleApiSchema;
