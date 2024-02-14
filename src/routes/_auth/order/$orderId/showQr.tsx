import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

import { maybeLazyError } from '@/src/utils/error';

export const Route = createFileRoute('/_auth/order/$orderId/showQr')({
  validateSearch: z.object({
    qrCode: z.string(),
  }),
  onError: maybeLazyError,
});
