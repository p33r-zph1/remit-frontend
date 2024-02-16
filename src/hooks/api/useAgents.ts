import { useSuspenseQuery } from '@tanstack/react-query';

import agentListApiSchema from '@/src/schema/agent-list';
import { genericFetch } from '@/src/schema/api/fetch';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/agents';

export default function useAgents(isoCode: string) {
  return useSuspenseQuery({
    queryKey: ['agents', isoCode],
    queryFn: () =>
      genericFetch(
        `${BASE_URL}?country_iso_code=${isoCode}`,
        agentListApiSchema
      ),
    select: response => response.data,
    refetchInterval: 15_000,
  });
}
