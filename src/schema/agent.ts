import { z } from 'zod';
import { makeApiSchema } from './api/fetch';

export const agentSchema = z.object({
  agentId: z.string(),
  isActive: z.boolean(),
  countryIsoCode: z.string(),
  commission: z.number(),
  contactDetails: z.object({
    telegram: z.string(),
  }),
});

const agentApiSchema = makeApiSchema(agentSchema);

export type Agent = z.infer<typeof agentSchema>;

export default agentApiSchema;
