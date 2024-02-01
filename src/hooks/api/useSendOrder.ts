import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { genericFetch } from '../../schema/api/fetch';
import orderApiSchema from '../../schema/order';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

const orderBodySchema = z.object({
  recipientId: z.string(),
  senderAgentId: z.string(),
  transferAmount: z.number(),
  senderCurrency: z.string(),
  recipientCurrency: z.string(),
});

export type OrderBody = z.infer<typeof orderBodySchema>;

export default function useSendOrder() {
  return useMutation({
    mutationKey: ['send-order'],
    mutationFn: (data: OrderBody) =>
      genericFetch(BASE_URL, orderApiSchema, {
        method: 'post',
        body: JSON.stringify(orderBodySchema.parse(data)),
      }),
  });
}
