import { z } from 'zod';

const alertSchema = z.object({
  title: z.string(),
  description: z.string(),
  timestamp: z.string(),
});

export type Alert = z.infer<typeof alertSchema>;

export default alertSchema;
