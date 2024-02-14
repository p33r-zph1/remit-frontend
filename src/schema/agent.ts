import { z } from 'zod';

import { makeApiSchema } from './api/fetch';
import contactSchema from './contact';

export const agentSchema = z.object({
  agentId: z.string(),
  isActive: z.boolean(),
  countryIsoCode: z.string(),
  commission: z.number(),
  contactDetails: contactSchema,
});

const agentApiSchema = makeApiSchema(agentSchema);

export type Agent = z.infer<typeof agentSchema>;

export default agentApiSchema;
