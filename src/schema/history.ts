import { z } from 'zod';
import { makeApiSchema } from './api/fetch';

const historySchema = z.object({
  account: z.string(),
  status: z.string(),
  amount: z.string(),
  conversion: z.string(),
});

const historyApiSchema = makeApiSchema(historySchema);

export type History = z.infer<typeof historySchema>;

export default historyApiSchema;
