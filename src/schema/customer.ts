import { isAddress } from 'viem';
import { z } from 'zod';

import { makeApiSchema } from './api/fetch';
import { contactSchema } from './contact';

export const customerSchema = z.object({
  customerId: z.string(),
  countryIsoCode: z.string(),
  contactDetails: contactSchema.optional(),
  walletAddress: z.string().refine(isAddress).optional(),
});

const customerApiSchema = makeApiSchema(customerSchema);

export type Customer = z.infer<typeof customerSchema>;

export type CustomerApi = z.infer<typeof customerApiSchema>;

export default customerApiSchema;
