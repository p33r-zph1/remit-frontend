import { useMutation } from '@tanstack/react-query';
import { isAddress } from 'viem';
import { z } from 'zod';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema from '@/src/schema/order';

const escrowDepositBodySchema = z.object({
  walletAddress: z.string().refine(isAddress),
});

export type EscrowDepositBody = z.infer<typeof escrowDepositBodySchema>;

export type MutationProps = {
  orderId: string;
  body: EscrowDepositBody;
};

export default function useEscrowDeposit() {
  return useMutation({
    mutationKey: ['escrow-deposit'],
    mutationFn: ({ orderId, body }: MutationProps) =>
      genericFetch(
        makeApiUrl(`/orders/${orderId}/escrow/deposit`),
        orderApiSchema,
        {
          method: 'PATCH',
          body: JSON.stringify(escrowDepositBodySchema.parse(body)),
        }
      ),
  });
}
