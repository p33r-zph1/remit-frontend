import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { API_URL } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema from '@/src/schema/order';

const BASE_URL = `${API_URL}/orders`;

const orderBodySchema = z.object({
  recipientId: z.string(),
  senderAgentId: z.string(),
  transferAmount: z.number(),
  senderCurrency: z.string(),
  recipientCurrency: z.string(),
});

export type OrderBody = z.infer<typeof orderBodySchema>;

export type MutationProps = {
  body: OrderBody;
};

export default function useCreateOrder() {
  return useMutation({
    mutationKey: ['create-order'],
    mutationFn: ({ body }: MutationProps) =>
      genericFetch(BASE_URL, orderApiSchema, {
        method: 'POST',
        body: JSON.stringify(orderBodySchema.parse(body)),
      }),
  });
}
