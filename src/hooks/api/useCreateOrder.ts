import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { genericFetch } from '../../schema/api/fetch';
import orderApiSchema from '../../schema/order';
import queryClient from '../../configs/tansact-query';

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
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['order', 'orders'] }),
  });
}
