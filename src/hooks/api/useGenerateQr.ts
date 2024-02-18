import { useMutation } from '@tanstack/react-query';

import { API_URL } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import qrCodeApiSchema from '@/src/schema/qr-code';

const BASE_URL = `${API_URL}/orders`;

export type MutationProps = {
  orderId: string;
};

export default function useGenerateQr() {
  return useMutation({
    mutationKey: ['generate-qr'],
    mutationFn: ({ orderId }: MutationProps) =>
      genericFetch(`${BASE_URL}/${orderId}/qr`, qrCodeApiSchema, {
        method: 'POST',
      }),
  });
}
