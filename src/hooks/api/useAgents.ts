import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { API_URL } from '@/src/configs/env';
import agentListApiSchema from '@/src/schema/agent-list';
import { genericFetch } from '@/src/schema/api/fetch';

import { agentKeys } from './keys/agent';

const BASE_URL = `${API_URL}/agents`;

export type AgentsQueryProps = {
  isoCode: string;
};

export const agentsQueryOptiions = ({ isoCode }: AgentsQueryProps) =>
  queryOptions({
    queryKey: agentKeys.list({ isoCode }),
    queryFn: () =>
      genericFetch(
        `${BASE_URL}?country_iso_code=${isoCode}`,
        agentListApiSchema
      ),
    select: response => response.data,
    refetchInterval: 20_000,
  });

export default function useAgents(
  props: Parameters<typeof agentsQueryOptiions>[0]
) {
  return useSuspenseQuery(agentsQueryOptiions(props));
}
