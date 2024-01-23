import { z } from 'zod';

type Pair = `${string}:${string}`;

const isValidPair = (data: string): data is Pair =>
  data.split(':').length === 2;

const priceOracleSchema = z.object({
  pair: z.string().refine(isValidPair),
  rate: z.number(),
});

export type PriceOracle = z.infer<typeof priceOracleSchema>;

export default priceOracleSchema;
