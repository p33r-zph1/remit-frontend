import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { genericFetch } from '../../schema/api/fetch';
// import orderApiSchema from '../../schema/order';
import { queryClient } from '../../utils/config';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

type MutationProps = {
  orderId: string;
};

export default function useRejectOrder() {
  return useMutation({
    mutationKey: ['reject-order'],
    mutationFn: ({ orderId }: MutationProps) =>
      genericFetch(`${BASE_URL}/${orderId}/reject`, z.any(), {
        method: 'patch',
      }),
    onSuccess: () => queryClient.removeQueries(),
  });
}
