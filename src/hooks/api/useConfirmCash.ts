import { useMutation } from '@tanstack/react-query';

import { API_URL } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema from '@/src/schema/order';

const BASE_URL = `${API_URL}/orders`;

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
