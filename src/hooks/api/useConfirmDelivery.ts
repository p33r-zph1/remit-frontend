import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema, {
  type OrderApi,
  type OrderType,
} from '@/src/schema/order';
import { slugify } from '@/src/utils';

import { orderKeys } from './keys/order.key';

const confirmDeliveryBodySchema = z.object({
  deliveryCode: z.string(),
});

export type ConfirmDeliveryBody = z.infer<typeof confirmDeliveryBodySchema>;

export type MutationProps = {
  orderType: OrderType;
  orderId: string;
  body: ConfirmDeliveryBody;
};

export default function useConfirmDelivery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['confirm-delivery'],
    mutationFn: ({ orderType, orderId, body }: MutationProps) => {
      const apiUrl = makeApiUrl(
        `/orders/${slugify(orderType)}/${orderId}/delivery/confirm`
      );

      return genericFetch(apiUrl, orderApiSchema, {
        method: 'PATCH',
        body: JSON.stringify(confirmDeliveryBodySchema.parse(body)),
      });
    },
    onSettled: (data, _, { orderId }) => {
      const queryKey = orderKeys.listItem({ orderId });

      queryClient.setQueryData<OrderApi>(queryKey, data);
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
