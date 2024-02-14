import { useMutation } from '@tanstack/react-query';
import { isAddress } from 'viem';
import { z } from 'zod';

import { baseSchema, genericFetch } from '@/src/schema/api/fetch';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

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
      genericFetch(`${BASE_URL}/${orderId}/escrow/deposit`, baseSchema, {
        method: 'PATCH',
        body: JSON.stringify(escrowDepositBodySchema.parse(body)),
      }),
  });
}
