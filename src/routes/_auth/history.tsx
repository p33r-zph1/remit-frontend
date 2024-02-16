import { createFileRoute } from '@tanstack/react-router';

import { ordersQueryOptions } from '@/src/hooks/api/useOrders';

export const Route = createFileRoute('/_auth/history')({
  loader: opts =>
    opts.context.queryClient.ensureQueryData(
      ordersQueryOptions({
        pageNumber: 1,
        pageSize: 10,
      })
    ),
  pendingMs: 0,
});
