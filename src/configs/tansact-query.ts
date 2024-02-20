import { QueryClient } from '@tanstack/react-query';

import { orderKeys } from '../hooks/api/keys/order';

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    staleTime: 10_000, // 10 seconds
  },
  mutations: {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: orderKeys.all,
      }),
  },
});

export default queryClient;
