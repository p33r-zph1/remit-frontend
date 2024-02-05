import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { genericFetch } from '../../schema/api/fetch';
import orderApiSchema from '../../schema/order';
import { queryClient } from '../../utils/config';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

const acceptorderBodySchema = z.object({
  recipientAgentId: z.string(),
});

export type AcceptOrderBody = z.infer<typeof acceptorderBodySchema>;

type MutationProps =
  | {
      key: 'customer';
      orderId: string;
      data: AcceptOrderBody;
    }
  | {
      key: 'agent';
      orderId: string;
    };

export default function useAcceptOrder() {
  return useMutation({
    mutationKey: ['accept-order'],
    mutationFn: (props: MutationProps) => {
      const { key, orderId } = props;

      return genericFetch(`${BASE_URL}/${orderId}/accept`, orderApiSchema, {
        method: 'PATCH',
        body:
          key === 'customer'
            ? JSON.stringify(acceptorderBodySchema.parse(props.data))
            : null,
      });
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
}
