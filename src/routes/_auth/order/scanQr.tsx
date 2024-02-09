import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/_auth/order/scanQr')({
  validateSearch: z.object({
    orderId: z.string(),
  }),
});
