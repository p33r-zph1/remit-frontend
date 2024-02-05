import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { genericFetch } from '../../schema/api/fetch';
// import orderApiSchema from '../../schema/order';
import { queryClient } from '../../utils/config';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

const acceptorderBodySchema = z.object({
  recipientAgentId: z.string(),
});

export type AcceptOrderBody = z.infer<typeof acceptorderBodySchema>;

type MutationProps = {
  orderId: string;
  data: AcceptOrderBody;
};

export default function useAcceptOrder() {
  return useMutation({
    mutationKey: ['accept-order'],
    mutationFn: ({ orderId, data }: MutationProps) =>
      genericFetch(`${BASE_URL}/${orderId}/accept`, z.any(), {
        method: 'patch',
        body: JSON.stringify(acceptorderBodySchema.parse(data)),
      }),
    onSuccess: () => queryClient.removeQueries(),
  });
}
