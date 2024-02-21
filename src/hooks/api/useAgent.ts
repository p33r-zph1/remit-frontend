import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import agentApiSchema from '@/src/schema/agent';
import { genericFetch } from '@/src/schema/api/fetch';

import { agentKeys } from './keys/agent';

export type AgentQueryProps = {
  agentId: string;
};

export const agentQueryOptions = ({ agentId }: AgentQueryProps) =>
  queryOptions({
    queryKey: agentKeys.listItem({ agentId }),
    queryFn: () =>
      genericFetch(makeApiUrl(`/agents/${agentId}`), agentApiSchema),
    select: response => response.data,
    refetchInterval: 15_000,
  });

export default function useAgent(
  props: Parameters<typeof agentQueryOptions>[0]
) {
  return useSuspenseQuery(agentQueryOptions(props));
}
