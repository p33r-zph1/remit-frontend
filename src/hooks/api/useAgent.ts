import { useSuspenseQuery } from '@tanstack/react-query';

import { API_URL } from '@/src/configs/env';
import agentApiSchema from '@/src/schema/agent';
import { genericFetch } from '@/src/schema/api/fetch';

const BASE_URL = `${API_URL}/agents`;

export default function useAgent(agentId: string | undefined) {
  return useSuspenseQuery({
    queryKey: ['agent', agentId],
    queryFn: () => genericFetch(`${BASE_URL}/${agentId}`, agentApiSchema),
    select: response => response.data,
    refetchInterval: 15_000,
  });
}
