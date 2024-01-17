import { string, z } from 'zod';

const alertSchema = z.object({
  title: string(),
  description: string(),
  timestamp: string(),
});

export type Alert = z.infer<typeof alertSchema>;

export default alertSchema;
