import { useMutation, useQueryClient } from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import qrCodeApiSchema from '@/src/schema/qr-code';

import { orderKeys } from './keys/order.key';

export type MutationProps = {
  orderId: string;
};

export default function useGenerateQr() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['generate-qr'],
    mutationFn: ({ orderId }: MutationProps) =>
      genericFetch(
        makeApiUrl(`/orders/cross-border-remittance/${orderId}/qr`),
        qrCodeApiSchema,
        {
          method: 'POST',
        }
      ),
    onSettled: (_, __, { orderId }) => {
      const queryKey = orderKeys.listItem({ orderId });

      queryClient.invalidateQueries({ queryKey });
    },
  });
}
