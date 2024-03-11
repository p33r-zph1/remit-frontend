import { createFileRoute } from '@tanstack/react-router';

import { ordersInfiniteQueryOptions } from '@/src/hooks/api/useInfiniteOrders';

export const Route = createFileRoute('/_auth/history')({
  loader: opts =>
    opts.context.queryClient.fetchInfiniteQuery(
      ordersInfiniteQueryOptions({
        pageSize: 10,
      })
    ),
  pendingMs: 0,
  pendingMinMs: 0,
});
