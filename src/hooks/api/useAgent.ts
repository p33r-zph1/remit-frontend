import { useSuspenseQuery } from '@tanstack/react-query';

import { genericFetch } from '../../schema/api/fetch';
import agentApiSchema from '../../schema/agent';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/agents';

export default function useAgent(agentId: string | undefined) {
  return useSuspenseQuery({
    queryKey: ['agent', agentId],
    queryFn: () => genericFetch(`${BASE_URL}/${agentId}`, agentApiSchema),
    select: response => response.data,
    refetchInterval: 15_000,
  });
}
