import { z } from 'zod';
import { makeApiSchema } from './api/fetch';

type Pair = `${string}:${string}`;

const isValidPair = (data: string): data is Pair =>
  data.split(':').length === 2;

const schema = z.object({
  pair: z.string().refine(isValidPair),
  rate: z.number(),
});

const priceOracleSchema = makeApiSchema(schema);

export type PriceOracle = z.infer<typeof schema>;

export default priceOracleSchema;
