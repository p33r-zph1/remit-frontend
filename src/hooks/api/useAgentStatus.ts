import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { makeApiUrl } from '@/src/configs/env';
import agentApiSchema, { type AgentApi } from '@/src/schema/agent';
import { genericFetch } from '@/src/schema/api/fetch';

import { agentKeys } from './keys/agent.key';

const agentStatusSchema = z.object({
  isActive: z.boolean(),
});

type AgentStatusBody = z.infer<typeof agentStatusSchema>;

type MutationProps = {
  agentId: string;
  body: AgentStatusBody;
};

export default function useAgentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['agent-status'],
    mutationFn: ({ agentId, body }: MutationProps) => {
      const apiUrl = makeApiUrl(`/agents/${agentId}/status`);

      return genericFetch(apiUrl, agentApiSchema, {
        method: 'PATCH',
        body: JSON.stringify(agentStatusSchema.parse(body)),
      });
    },
    onSettled: (data, _, { agentId }) => {
      const queryKey = agentKeys.listItem({ agentId });

      queryClient.setQueryData<AgentApi>(queryKey, data);
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
