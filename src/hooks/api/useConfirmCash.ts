import { useMutation } from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema from '@/src/schema/order';

export type MutationProps = {
  orderId: string;
};

export default function useConfirmCash() {
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
  });
}
