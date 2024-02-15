import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema from '@/src/schema/order';

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
  type: 'customer';
  orderId: string;
  body: CustomerOrderBody;
};

type SenderAgentMutation = {
  type: 'senderagent';
  orderId: string;
  body: SenderAgentOrderBody;
};

type RecipientAgentMutation = {
  type: 'recipientagent';
  orderId: string;
};

export type MutationProps =
  | CustomerMutation
  | SenderAgentMutation
  | RecipientAgentMutation;

export type AgentType = MutationProps['type'];

function handleRequestBody(props: MutationProps) {
  switch (props.type) {
    case 'customer':
      return JSON.stringify(customerOrderBodySchema.parse(props.body));
    case 'senderagent':
      return JSON.stringify(senderAgentOrderBodySchema.parse(props.body));
    case 'recipientagent':
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
  });
}
