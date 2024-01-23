import { z } from 'zod';

const historySchema = z.object({
  account: z.string(),
  status: z.string(),
  amount: z.string(),
  conversion: z.string(),
});

export type History = z.infer<typeof historySchema>;

export default historySchema;
