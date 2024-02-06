import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { genericFetch } from '../../schema/api/fetch';
import orderApiSchema from '../../schema/order';
import { queryClient } from '../../utils/config';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

const collectionSchema = z.object({
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  areaName: z.string(),
  coordinates: z.object({
    latitude: z.string(),
    longitude: z.string(),
  }),
  radius: z.object({
    value: z.number(),
    unit: z.enum(['m', 'km']),
  }),
});

export type CollectionBody = z.infer<typeof collectionSchema>;

type MutationProps = {
  orderId: string;
  data: CollectionBody;
};

export default function useSetCollection() {
  return useMutation({
    mutationKey: ['set-collection'],
    mutationFn: ({ orderId, data }: MutationProps) =>
      genericFetch(
        `${BASE_URL}/${orderId}/collection/details`,
        orderApiSchema,
        {
          method: 'PATCH',
          body: JSON.stringify(collectionSchema.parse(data)),
        }
      ),
    onSuccess: () => queryClient.invalidateQueries(),
  });
}
