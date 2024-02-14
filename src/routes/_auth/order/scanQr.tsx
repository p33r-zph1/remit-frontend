import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { maybeLazyError } from '@/src/utils/error';

export const Route = createFileRoute('/_auth/order/scanQr')({
  validateSearch: z.object({
    orderId: z.string().nullish(),
  }),
  onError: maybeLazyError,
});
