import { createFileRoute } from '@tanstack/react-router';

import { orderQueryOptions } from '@/src/hooks/api/useGetOrder';

export const Route = createFileRoute('/_auth/order/$orderId/')({
  loader: opts =>
    opts.context.queryClient.ensureQueryData(
      orderQueryOptions({ orderId: opts.params.orderId })
    ),
  pendingMs: 0,
  pendingMinMs: 0,
});
