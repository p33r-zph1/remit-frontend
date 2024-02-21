import { useMutation } from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema from '@/src/schema/order';

export type MutationProps = {
  orderId: string;
};

export default function useRejectOrder() {
  return useMutation({
    mutationKey: ['reject-order'],
    mutationFn: ({ orderId }: MutationProps) =>
      genericFetch(makeApiUrl(`/orders/${orderId}/reject`), orderApiSchema, {
        method: 'PATCH',
      }),
  });
}
