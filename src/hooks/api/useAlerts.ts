import { useSuspenseQuery } from '@tanstack/react-query';

import alertApiSchema from '@/src/schema/alert';
import { genericFetch } from '@/src/schema/api/fetch';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function useAlerts() {
  return useSuspenseQuery({
    queryKey: ['alerts'],
    queryFn: () => genericFetch(BASE_URL, alertApiSchema),
    refetchInterval: 15_000,
  });
}
