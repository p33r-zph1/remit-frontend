import { createFileRoute } from '@tanstack/react-router';

import { ordersQueryOptions } from '@/src/hooks/api/useOrders';
import { maybeLazyError } from '@/src/utils/error';

export const Route = createFileRoute('/_auth/history')({
  loader: opts =>
    opts.context.queryClient.ensureQueryData(
      ordersQueryOptions({
        pageNumber: 1,
        pageSize: 10,
      })
    ),
  pendingMs: 0,
  onError: maybeLazyError,
});
