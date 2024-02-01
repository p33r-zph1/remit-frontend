import { z } from 'zod';
import { makeApiSchema } from './api/fetch';

// [
// {
//         "isActive": true,
//         "countryIsoCode": "AE",
//         "contactDetails": {
//             "telegram": "t.me/kshyun28"
//         },
//         "commission": "0.8",
//         "agentType": "",
//         "agentId": "43210003"
//     }
// ]

const agentSchema = z.array(
  z.object({
    isActive: z.boolean(),
    countryIsoCode: z.string(), // TODO: in, sg, ae
    contactDetails: z.object({
      telegram: z.string(),
    }),
    commission: z.string(),
    agentType: z.string(),
    agentId: z.string(),
  })
);

const agentApiSchema = makeApiSchema(agentSchema);

export type Agent = z.infer<typeof agentSchema>;

export default agentApiSchema;
