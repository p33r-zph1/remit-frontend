import { z } from 'zod';
import { makeApiSchema } from './api/fetch';

const schema = z.object({
  title: z.string(),
  description: z.string(),
  timestamp: z.string(),
});

const alertSchema = makeApiSchema(schema);

export type Alert = z.infer<typeof schema>;

export default alertSchema;
