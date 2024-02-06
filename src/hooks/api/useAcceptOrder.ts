import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { genericFetch } from '../../schema/api/fetch';
import orderApiSchema from '../../schema/order';
import { queryClient } from '../../utils/config';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

const customerOrderBodySchema = z.object({
  recipientAgentId: z.string(),
});

const senderAgentOrderBodySchema = z.object({
  chain: z.string(),
});

export type CustomerOrderBody = z.infer<typeof customerOrderBodySchema>;

export type SenderAgentOrderBody = z.infer<typeof senderAgentOrderBodySchema>;

type CustomerMutation = {
  key: 'customer';
  orderId: string;
  body: CustomerOrderBody;
};

type SenderAgentMutation = {
  key: 'senderagent';
  orderId: string;
  body: SenderAgentOrderBody;
};

type RecipientAgentMutation = {
  key: 'agent';
  orderId: string;
};

export type MutationProps =
  | CustomerMutation
  | SenderAgentMutation
  | RecipientAgentMutation;

function handleRequestBody(props: MutationProps) {
  switch (props.key) {
    case 'customer':
      return JSON.stringify(customerOrderBodySchema.parse(props.body));
    case 'senderagent':
      return JSON.stringify(senderAgentOrderBodySchema.parse(props.body));
    case 'agent':
      return null;
  }
}

export default function useAcceptOrder() {
  return useMutation({
    mutationKey: ['accept-order'],
    mutationFn: (props: MutationProps) => {
      const { orderId } = props;

      return genericFetch(`${BASE_URL}/${orderId}/accept`, orderApiSchema, {
        method: 'PATCH',
        body: handleRequestBody(props),
      });
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
}
