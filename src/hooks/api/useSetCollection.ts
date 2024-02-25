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

const meetupSchema = z.object({
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

export type MeetUpBody = z.infer<typeof meetupSchema>;

export type MutationProps = {
  orderType: OrderType;
  orderId: string;
  body: MeetUpBody;
  meetupType: 'collection' | 'delivery';
};

export default function useSetCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['set-collection'],
    mutationFn: ({ orderType, orderId, meetupType, body }: MutationProps) => {
      const apiUrl = makeApiUrl(
        `/orders/${slugify(orderType)}/${orderId}/${meetupType}/details`
      );
      return genericFetch(apiUrl, orderApiSchema, {
        method: 'PATCH',
        body: JSON.stringify(meetupSchema.parse(body)),
      });
    },
    onSettled: (data, _, { orderId }) => {
      const queryKey = orderKeys.listItem({ orderId });

      queryClient.setQueryData<OrderApi>(queryKey, data);
      queryClient.invalidateQueries({ queryKey });
    },
  });
}
