import { useMutation } from '@tanstack/react-query';

import { genericFetch } from '../../schema/api/fetch';
import orderApiSchema from '../../schema/order';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

export type MutationProps = {
  orderId: string;
};

export default function useConfirmCash() {
  return useMutation({
    mutationKey: ['confirm-cash'],
    mutationFn: ({ orderId }: MutationProps) =>
      genericFetch(
        `${BASE_URL}/${orderId}/collection/confirm`,
        orderApiSchema,
        {
          method: 'PATCH',
        }
      ),
  });
}
