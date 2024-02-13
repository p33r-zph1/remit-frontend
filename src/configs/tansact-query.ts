import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  mutations: {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['order'],
      }),
  },
});

export default queryClient;
