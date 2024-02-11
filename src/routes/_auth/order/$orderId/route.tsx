import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { orderQueryOptions } from '../../../../hooks/api/useOrder';
import { maybeLazyError } from '../../../../utils/error';

export const Route = createFileRoute('/_auth/order/$orderId')({
  loader: opts =>
    opts.context.queryClient.ensureQueryData(
      orderQueryOptions({ orderId: opts.params.orderId })
    ),
  pendingMs: 0,
  validateSearch: z.object({
    qrCode: z.string().optional(),
  }),
  onError: maybeLazyError,
});
