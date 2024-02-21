import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

queryClient.setDefaultOptions({
  queries: {
    staleTime: 10_000, // 10 seconds
  },
});

export default queryClient;
