import { QueryClient } from '@tanstack/react-query';

import { orderKeys } from '../hooks/api/keys/order';

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  mutations: {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: orderKeys.all,
      }),
  },
});

export default queryClient;
