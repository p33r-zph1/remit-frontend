import { useMutation } from '@tanstack/react-query';
import { isAddress } from 'viem';
import { z } from 'zod';

import { API_URL } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema from '@/src/schema/order';

const BASE_URL = `${API_URL}/orders`;

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
      genericFetch(`${BASE_URL}/${orderId}/escrow/deposit`, orderApiSchema, {
        method: 'PATCH',
        body: JSON.stringify(escrowDepositBodySchema.parse(body)),
      }),
  });
}
