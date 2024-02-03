import type { JWT } from 'aws-amplify/auth';
import { z } from 'zod';

const cognitoPayloadSchema = z.object({
  payload: z.object({
    'cognito:username': z.string(),
    'cognito:groups': z
      .tuple([z.literal('customer')])
      .or(z.tuple([z.literal('recipient')])),
  }),
});

export function fromJwt(jwt: JWT | undefined) {
  const result = cognitoPayloadSchema.safeParse(jwt);

  if (result.success) return result.data.payload;
}

export type CognitoPayload = z.infer<typeof cognitoPayloadSchema>;
