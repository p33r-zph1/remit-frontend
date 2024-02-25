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

export default function useConfirmCash() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['confirm-cash'],
    mutationFn: ({ orderType, orderId }: MutationProps) => {
      const apiUrl = makeApiUrl(
        `/orders/${slugify(orderType)}/${orderId}/collection/confirm`
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
