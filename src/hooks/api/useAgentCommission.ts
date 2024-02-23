import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { makeApiUrl } from '@/src/configs/env';
import agentApiSchema, { type AgentApi } from '@/src/schema/agent';
import { genericFetch } from '@/src/schema/api/fetch';

import { agentKeys } from './keys/agent.key';

const agentCommissionSchema = z.object({
  commission: z.number(),
});

type AgentCommissionBody = z.infer<typeof agentCommissionSchema>;

type MutationProps = {
  agentId: string;
  body: AgentCommissionBody;
};

export default function useAgentCommission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['agent-commission'],
    mutationFn: ({ agentId, body }: MutationProps) => {
      const apiUrl = makeApiUrl(`/agents/${agentId}/commission`);

      return genericFetch(apiUrl, agentApiSchema, {
        method: 'PATCH',
        body: JSON.stringify(agentCommissionSchema.parse(body)),
      });
    },
    onSettled: (data, _, { agentId }) => {
      const queryKey = agentKeys.listItem({ agentId });

      queryClient.setQueryData<AgentApi>(queryKey, data);
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
