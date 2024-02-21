import { useMutation } from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import qrCodeApiSchema from '@/src/schema/qr-code';

export type MutationProps = {
  orderId: string;
};

export default function useGenerateQr() {
  return useMutation({
    mutationKey: ['generate-qr'],
    mutationFn: ({ orderId }: MutationProps) =>
      genericFetch(makeApiUrl(`/orders/${orderId}/qr`), qrCodeApiSchema, {
        method: 'POST',
      }),
  });
}
