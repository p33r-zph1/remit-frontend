import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema, {
  type OrderApi,
  type OrderType,
} from '@/src/schema/order';
import { slugify } from '@/src/utils';

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
  orderType: OrderType;
  body: OrderBody;
};

export default function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-order'],
    mutationFn: ({ orderType, body }: MutationProps) => {
      const apiUrl = makeApiUrl(`/orders/${slugify(orderType)}`);

      return genericFetch(apiUrl, orderApiSchema, {
        method: 'POST',
        body: JSON.stringify(orderBodySchema.parse(body)),
      });
    },
    onSuccess: data => {
      const { orderId } = data.data;
      queryClient.setQueryData<OrderApi>(orderKeys.listItem({ orderId }), data);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
}
