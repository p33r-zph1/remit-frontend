import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAddress } from 'viem';
import { z } from 'zod';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';

import { customerKeys } from './keys/customer';

const profileBodySchema = z.object({
  walletAddress: z.string().refine(isAddress),
  telegram: z.string(),
});

type ProfileBodySchema = z.infer<typeof profileBodySchema>;

export type MutationProps = {
  type: 'customers' | 'agents';
  userId: string;
  body: ProfileBodySchema;
};

export default function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['update-profile'],
    mutationFn: ({ type, userId, body }: MutationProps) => {
      const apiUrl = makeApiUrl(`/${type}/${userId}`);

      return genericFetch(apiUrl, z.any(), {
        method: 'PATCH',
        body: JSON.stringify(profileBodySchema.parse(body)),
      });
    },
    onSettled: (_, __, { userId }) => {
      const queryKey = customerKeys.listItem({ customerId: userId });

      queryClient.invalidateQueries({ queryKey });
    },
  });
}
