import { createFileRoute } from '@tanstack/react-router';

import { maybeLazyError } from '@/src/utils/error';

export const Route = createFileRoute('/_auth/order/$orderId/scanQr')({
  onError: maybeLazyError,
});
