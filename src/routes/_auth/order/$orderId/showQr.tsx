import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_auth/order/$orderId/showQr')({
  validateSearch: z.object({
    qrCode: z.string(),
  }),
  pendingMs: 0,
});
