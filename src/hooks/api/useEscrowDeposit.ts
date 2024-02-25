import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAddress } from 'viem';
import { z } from 'zod';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema, {
  type OrderApi,
  type OrderType,
} from '@/src/schema/order';
import { slugify } from '@/src/utils';

import { orderKeys } from './keys/order.key';

const escrowDepositBodySchema = z.object({
  walletAddress: z.string().refine(isAddress),
});

export type EscrowDepositBody = z.infer<typeof escrowDepositBodySchema>;

export type MutationProps = {
  orderType: OrderType;
  orderId: string;
  body: EscrowDepositBody;
};

export default function useEscrowDeposit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['escrow-deposit'],
    mutationFn: ({ orderType, orderId, body }: MutationProps) => {
      const apiUrl = makeApiUrl(
        `/orders/${slugify(orderType)}/${orderId}/escrow/deposit`
      );

      return genericFetch(apiUrl, orderApiSchema, {
        method: 'PATCH',
        body: JSON.stringify(escrowDepositBodySchema.parse(body)),
      });
    },
    onSettled: (data, _, { orderId }) => {
      const queryKey = orderKeys.listItem({ orderId });

      queryClient.setQueryData<OrderApi>(queryKey, data);
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
