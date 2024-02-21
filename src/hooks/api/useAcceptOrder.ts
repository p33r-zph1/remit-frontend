import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema, { type OrderApi } from '@/src/schema/order';

import { orderKeys } from './keys/order.key';

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['accept-order'],
    mutationFn: (props: MutationProps) => {
      const { orderId } = props;

      return genericFetch(
        makeApiUrl(`/orders/${orderId}/accept`),
        orderApiSchema,
        {
          method: 'PATCH',
          body: handleRequestBody(props),
        }
      );
    },
    onSettled: (data, _, { orderId }) => {
      const queryKey = orderKeys.listItem({ orderId });

      queryClient.setQueryData<OrderApi>(queryKey, data);
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
