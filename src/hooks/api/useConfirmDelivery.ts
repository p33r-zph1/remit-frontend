import { useMutation } from '@tanstack/react-query';

import { genericFetch } from '../../schema/api/fetch';
import qrCodeApiSchema from '../../schema/qr-code';
import { queryClient } from '../../utils/config';
import { z } from 'zod';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

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
      genericFetch(`${BASE_URL}/${orderId}/delivery/confirm`, qrCodeApiSchema, {
        method: 'PATCH',
        body: JSON.stringify(confirmDeliveryBodySchema.parse(body)),
      }),
    onSuccess: () => queryClient.invalidateQueries(),
  });
}
