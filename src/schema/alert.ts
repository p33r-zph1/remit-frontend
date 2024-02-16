import { z } from 'zod';

import { makeApiSchema } from './api/fetch';

const alertSchema = z.object({
  title: z.string(),
  description: z.string(),
  timestamp: z.string(),
});

const alertApiSchema = makeApiSchema(alertSchema);

export type Alert = z.infer<typeof alertSchema>;

export default alertApiSchema;
