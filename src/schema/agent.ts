import { isAddress } from 'viem';
import { z } from 'zod';

import { makeApiSchema } from './api/fetch';
import { contactSchema } from './contact';

export const agentSchema = z.object({
  agentId: z.string(),
  isActive: z.boolean(),
  countryIsoCode: z.string(),
  commission: z.number(),
  contactDetails: contactSchema.optional(),
  walletAddress: z.string().refine(isAddress).optional(),
});

const agentApiSchema = makeApiSchema(agentSchema);

export type Agent = z.infer<typeof agentSchema>;

export type AgentApi = z.infer<typeof agentApiSchema>;

export default agentApiSchema;
