import { useMutation } from '@tanstack/react-query';

import { genericFetch } from '../../schema/api/fetch';
import qrCodeApiSchema from '../../schema/qr-code';
import queryClient from '../../configs/tansact-query';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

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
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['order', 'orders'] }),
  });
}
