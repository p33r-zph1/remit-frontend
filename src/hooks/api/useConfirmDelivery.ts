import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { API_URL } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema from '@/src/schema/order';

const BASE_URL = `${API_URL}/orders`;

const confirmDeliveryBodySchema = z.object({
  deliveryCode: z.string(),
});

export type ConfirmDeliveryBody = z.infer<typeof confirmDeliveryBodySchema>;

export type MutationProps = {
  orderId: string;
  body: ConfirmDeliveryBody;
};

export default function useConfirmDelivery() {
  return useMutation({
    mutationKey: ['confirm-delivery'],
    mutationFn: ({ orderId, body }: MutationProps) =>
      genericFetch(`${BASE_URL}/${orderId}/delivery/confirm`, orderApiSchema, {
        method: 'PATCH',
        body: JSON.stringify(confirmDeliveryBodySchema.parse(body)),
      }),
  });
}
