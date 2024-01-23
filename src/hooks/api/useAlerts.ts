import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { Options, genericFetch } from '../../schema/api/fetch';
import alertSchema from '../../schema/alert';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function useAlerts(
  { refetchInterval }: Options = { refetchInterval: 5000 }
) {
  const alertsQueryOptions = queryOptions({
    queryKey: ['alert'],
    queryFn: () => genericFetch(BASE_URL, alertSchema),
    refetchInterval: refetchInterval,
  });

  return useSuspenseQuery(alertsQueryOptions);
}
