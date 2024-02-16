import { useMutation } from '@tanstack/react-query';

import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema from '@/src/schema/order';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

export type MutationProps = {
  orderId: string;
};

export default function useRejectOrder() {
  return useMutation({
    mutationKey: ['reject-order'],
    mutationFn: ({ orderId }: MutationProps) =>
      genericFetch(`${BASE_URL}/${orderId}/reject`, orderApiSchema, {
        method: 'PATCH',
      }),
  });
}
