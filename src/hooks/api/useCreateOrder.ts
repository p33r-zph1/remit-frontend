import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema, { type OrderApi } from '@/src/schema/order';

import { orderKeys } from './keys/order.key';

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-order'],
    mutationFn: ({ body }: MutationProps) =>
      genericFetch(makeApiUrl('/orders'), orderApiSchema, {
        method: 'POST',
        body: JSON.stringify(orderBodySchema.parse(body)),
      }),
    onSettled: data => {
      const queryKey = orderKeys.all;

      queryClient.setQueryData<OrderApi>(queryKey, data);
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
