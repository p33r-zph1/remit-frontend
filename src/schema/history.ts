import { z } from 'zod';
import { makeApiSchema } from './api/fetch';

const schema = z.object({
  account: z.string(),
  status: z.string(),
  amount: z.string(),
  conversion: z.string(),
});

const historySchema = makeApiSchema(schema);

export type History = z.infer<typeof schema>;

export default makeApiSchema(historySchema);
