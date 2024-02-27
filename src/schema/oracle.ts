import { z } from 'zod';

import { makeApiSchema } from './api/fetch';

type Pair = `${string}:${string}`;

const isValidPair = (data: string): data is Pair =>
  data.split(':').length === 2;

export const oracleSchema = z.object({
  pair: z.string().refine(isValidPair),
  rate: z.number(),
});

const oracleApiSchema = makeApiSchema(oracleSchema);

export type Oracle = z.infer<typeof oracleSchema>;

export default oracleApiSchema;
