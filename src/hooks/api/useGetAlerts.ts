import { useSuspenseQuery } from '@tanstack/react-query';

import alertApiSchema from '@/src/schema/alert';
import { genericFetch } from '@/src/schema/api/fetch';

export default function useGetAlerts() {
  return useSuspenseQuery({
    queryKey: ['alerts'],
    queryFn: () =>
      genericFetch(
        'https://jsonplaceholder.typicode.com/posts',
        alertApiSchema
      ),
    refetchInterval: 15_000,
  });
}
