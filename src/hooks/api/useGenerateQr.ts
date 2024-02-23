import { useMutation, useQueryClient } from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import { type OrderType } from '@/src/schema/order';
import qrCodeApiSchema from '@/src/schema/qr-code';
import { slugify } from '@/src/utils';

import { orderKeys } from './keys/order.key';

export type MutationProps = {
  orderType: OrderType;
  orderId: string;
};

export default function useGenerateQr() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['generate-qr'],
    mutationFn: ({ orderType, orderId }: MutationProps) => {
      const apiUrl = makeApiUrl(`/orders/${slugify(orderType)}/${orderId}/qr`);

      return genericFetch(apiUrl, qrCodeApiSchema, {
        method: 'POST',
      });
    },
    onSettled: (_, __, { orderId }) => {
      const queryKey = orderKeys.listItem({ orderId });

      queryClient.invalidateQueries({ queryKey });
    },
  });
}
