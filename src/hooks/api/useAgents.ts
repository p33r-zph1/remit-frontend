import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import agentListApiSchema from '@/src/schema/agent-list';
import { genericFetch } from '@/src/schema/api/fetch';

import { agentKeys } from './keys/agent.key';

export type AgentsQueryProps = {
  isoCode: string;
};

export const agentsQueryOptiions = ({ isoCode }: AgentsQueryProps) =>
  queryOptions({
    queryKey: agentKeys.list({ isoCode }),
    queryFn: () => {
      const apiUrl = makeApiUrl('/agents');
      apiUrl.searchParams.append('country_iso_code', isoCode);

      return genericFetch(apiUrl, agentListApiSchema);
    },
    select: response => response.data,
    refetchInterval: 20_000,
  });

export default function useAgents(
  props: Parameters<typeof agentsQueryOptiions>[0]
) {
  return useSuspenseQuery(agentsQueryOptiions(props));
}
