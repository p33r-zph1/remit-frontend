import { useSuspenseQuery } from '@tanstack/react-query';

import { genericFetch } from '../../schema/api/fetch';
import alertApiSchema from '../../schema/alert';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function useAlerts() {
  return useSuspenseQuery({
    queryKey: ['alerts'],
    queryFn: () => genericFetch(BASE_URL, alertApiSchema),
    refetchInterval: 15_000,
  });
}
