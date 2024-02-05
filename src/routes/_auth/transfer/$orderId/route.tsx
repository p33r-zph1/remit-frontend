import { createFileRoute } from '@tanstack/react-router';
import { orderQueryOptions } from '../../../../hooks/api/useOrder';

export const Route = createFileRoute('/_auth/transfer/$orderId')({
  pendingMs: 0,
  loader: opts =>
    opts.context.queryClient.ensureQueryData(
      orderQueryOptions({ orderId: opts.params.orderId })
    ),
});
