import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { fetchAlerts } from '../api/alerts/query';
import { Options } from '../api/types';

export default function useAlerts(
  { refetchInterval }: Options = { refetchInterval: 5000 }
) {
  const alertsQueryOptions = queryOptions({
    queryKey: ['alert'],
    queryFn: () => fetchAlerts(),
    refetchInterval: refetchInterval,
  });

  return useSuspenseQuery(alertsQueryOptions);
}
