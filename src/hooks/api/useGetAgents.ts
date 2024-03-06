import { queryOptions, skipToken, useQuery } from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import agentListApiSchema from '@/src/schema/agent-list';
import { genericFetch } from '@/src/schema/api/fetch';

import { agentKeys } from './keys/agent.key';

export type AgentsQueryProps = {
  isoCode: string | undefined;
};

export const agentsQueryOptiions = ({ isoCode }: AgentsQueryProps) =>
  queryOptions({
    queryKey: agentKeys.list({ isoCode }),
    queryFn: isoCode
      ? () => {
          const apiUrl = makeApiUrl('/agents');
          apiUrl.searchParams.append('country_iso_code', isoCode);

          return genericFetch(apiUrl, agentListApiSchema);
        }
      : skipToken,
    select: response => response.data,
    refetchInterval: 20_000,
  });

export default function useGetAgents(
  props: Parameters<typeof agentsQueryOptiions>[0]
) {
  return useQuery(agentsQueryOptiions(props));
}
