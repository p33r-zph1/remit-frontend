import { z } from 'zod';
import { makeApiSchema } from './api/fetch';

export const agentSchema = z.object({
  isActive: z.boolean(),
  countryIsoCode: z.string(),
  contactDetails: z.object({
    telegram: z.string(),
  }),
  commission: z.string(),
  agentId: z.string(),
});

const agentApiSchema = makeApiSchema(agentSchema);

export type Agent = z.infer<typeof agentSchema>;

export default agentApiSchema;
