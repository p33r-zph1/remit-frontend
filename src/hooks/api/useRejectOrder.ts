import { useMutation, useQueryClient } from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema, { type OrderApi } from '@/src/schema/order';

import { orderKeys } from './keys/order.key';

export type MutationProps = {
  orderId: string;
};

export default function useRejectOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reject-order'],
    mutationFn: ({ orderId }: MutationProps) =>
      genericFetch(
        makeApiUrl(`/orders/cross-border-remittance/${orderId}/reject`),
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
