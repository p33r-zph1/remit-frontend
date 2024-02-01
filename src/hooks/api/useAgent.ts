import { useSuspenseQuery } from '@tanstack/react-query';

import { genericFetch } from '../../schema/api/fetch';
import { Options, defaultOptions } from '../../schema/api';
import agentApiSchema from '../../schema/agent';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/agents';

export default function useAgents(
  isoCode: 'in' | 'ae' | 'sg', // TODO: use zod enum
  { refetchInterval }: Options = defaultOptions
) {
  return useSuspenseQuery({
    queryKey: ['agents', isoCode],
    queryFn: () =>
      genericFetch(`${BASE_URL}?country_iso_code=${isoCode}`, agentApiSchema),
    select: response => response.data,
    refetchInterval,
  });
}
