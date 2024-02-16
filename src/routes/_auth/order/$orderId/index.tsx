import { createFileRoute } from '@tanstack/react-router';

import { orderQueryOptions } from '@/src/hooks/api/useOrder';

export const Route = createFileRoute('/_auth/order/$orderId/')({
  loader: opts =>
    opts.context.queryClient.ensureQueryData(
      orderQueryOptions({ orderId: opts.params.orderId })
    ),
  pendingMs: 0,
});
