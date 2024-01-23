import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { fetchHistory } from '../api/history/query';
import { Options } from '../api/types';

export default function useHistory(
  { refetchInterval }: Options = { refetchInterval: 5000 }
) {
  const historyQueryOptions = queryOptions({
    queryKey: ['history'],
    queryFn: () => fetchHistory(),
    refetchInterval: refetchInterval,
  });

  return useSuspenseQuery(historyQueryOptions);
}
