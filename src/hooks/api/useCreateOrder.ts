import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema, {
  type OrderApi,
  type OrderType,
} from '@/src/schema/order';
import { slugify } from '@/src/utils';

import { orderKeys } from './keys/order.key';

const crossBorderBodySchema = z.object({
  recipientId: z.string(),
  senderAgentId: z.string(),
  transferAmount: z.number(),
  senderCurrency: z.string(),
  recipientCurrency: z.string(),
});

const crossBorderSelfBodySchema = z.object({
  senderAgentId: z.string(),
  recipientAgentId: z.string(),
  transferAmount: z.number(),
  senderCurrency: z.string(),
  recipientCurrency: z.string(),
  arrivesAt: z.date(),
});

const localSellBodySchema = z.object({
  recipientAgentId: z.string(),
  transferAmount: z.number(),
  recipientCurrency: z.string(),
  chain: z.string(),
  token: z.string(),
});

const localBuyBodySchema = z.object({
  senderAgentId: z.string(),
  transferAmount: z.number(),
  senderCurrency: z.string(),
  chain: z.string(),
  token: z.string(),
});

export type CrossBorderBody = z.infer<typeof crossBorderBodySchema>;

export type CrossBorderSelfBody = z.infer<typeof crossBorderSelfBodySchema>;

export type LocalBuyBody = z.infer<typeof localBuyBodySchema>;

export type LocalSellBody = z.infer<typeof localSellBodySchema>;

export type CreateOrderBody =
  | CrossBorderBody
  | CrossBorderSelfBody
  | LocalBuyBody
  | LocalSellBody;

export type MutationProps = {
  orderType: OrderType;
  body: CreateOrderBody;
};

function handleRequestBody(props: MutationProps) {
  switch (props.orderType) {
    case 'CROSS_BORDER_REMITTANCE':
      return JSON.stringify(crossBorderBodySchema.parse(props.body));
    case 'CROSS_BORDER_SELF_REMITTANCE':
      return JSON.stringify(crossBorderSelfBodySchema.parse(props.body));
    case 'LOCAL_BUY_STABLECOINS':
      return JSON.stringify(localBuyBodySchema.parse(props.body));
    case 'LOCAL_SELL_STABLECOINS':
      return JSON.stringify(localSellBodySchema.parse(props.body));
  }
}

export default function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['create-order'],
    mutationFn: (props: MutationProps) => {
      const apiUrl = makeApiUrl(`/orders/${slugify(props.orderType)}`);

      return genericFetch(apiUrl, orderApiSchema, {
        method: 'POST',
        body: handleRequestBody(props),
      });
    },
    onSuccess: data => {
      const { orderId } = data.data;
      queryClient.setQueryData<OrderApi>(orderKeys.listItem({ orderId }), data);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
}
