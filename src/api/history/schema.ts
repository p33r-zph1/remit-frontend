import { string, z } from 'zod';

const historySchema = z.object({
  account: string(),
  status: string(),
  amount: string(),
  conversion: string(),
});

export type History = z.infer<typeof historySchema>;

export default historySchema;
