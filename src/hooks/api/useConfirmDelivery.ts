import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema, { type OrderApi } from '@/src/schema/order';

import { orderKeys } from './keys/order.key';

const confirmDeliveryBodySchema = z.object({
  deliveryCode: z.string(),
});

export type ConfirmDeliveryBody = z.infer<typeof confirmDeliveryBodySchema>;

export type MutationProps = {
  orderId: string;
  body: ConfirmDeliveryBody;
};

export default function useConfirmDelivery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['confirm-delivery'],
    mutationFn: ({ orderId, body }: MutationProps) =>
      genericFetch(
        makeApiUrl(`/orders/${orderId}/delivery/confirm`),
        orderApiSchema,
        {
          method: 'PATCH',
          body: JSON.stringify(confirmDeliveryBodySchema.parse(body)),
        }
      ),
    onSettled: (data, _, { orderId }) => {
      const queryKey = orderKeys.listItem({ orderId });

      queryClient.setQueryData<OrderApi>(queryKey, data);
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
