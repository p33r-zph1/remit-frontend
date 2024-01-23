import { useSuspenseQuery } from '@tanstack/react-query';

import { Options, genericFetch } from '../../schema/api/fetch';
import alertSchema from '../../schema/alert';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export default function useHistory(
  { refetchInterval }: Options = { refetchInterval: 5_000 } // 5 seconds
) {
  return useSuspenseQuery({
    queryKey: ['history'],
    queryFn: () => genericFetch(BASE_URL, alertSchema),
    refetchInterval: refetchInterval,
  });
}
