import { useMutation, useQueryClient } from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema, { type OrderApi } from '@/src/schema/order';

import { orderKeys } from './keys/order.key';

export type MutationProps = {
  orderId: string;
};

export default function useConfirmCash() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['confirm-cash'],
    mutationFn: ({ orderId }: MutationProps) =>
      genericFetch(
        makeApiUrl(`/orders/${orderId}/collection/confirm`),
        orderApiSchema,
        {
          method: 'PATCH',
        }
      ),
    onSettled: (data, _, { orderId }) => {
      const queryKey = orderKeys.listItem({ orderId });

      queryClient.setQueryData<OrderApi>(queryKey, data);
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
