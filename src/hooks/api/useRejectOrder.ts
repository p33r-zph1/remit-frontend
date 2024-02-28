import { useMutation, useQueryClient } from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema, {
  type OrderApi,
  type OrderType,
} from '@/src/schema/order';
import { slugify } from '@/src/utils';

import { orderKeys } from './keys/order.key';

export type MutationProps = {
  orderType: OrderType;
  orderId: string;
};

export default function useRejectOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['reject-order'],
    mutationFn: ({ orderType, orderId }: MutationProps) => {
      const apiUrl = makeApiUrl(
        `/orders/${slugify(orderType)}/${orderId}/reject`
      );

      return genericFetch(apiUrl, orderApiSchema, {
        method: 'PATCH',
      });
    },
    onSettled: (data, _, { orderId }) => {
      const queryKey = orderKeys.listItem({ orderId });

      queryClient.setQueryData<OrderApi>(queryKey, data);
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
