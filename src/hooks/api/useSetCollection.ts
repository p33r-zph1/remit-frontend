import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { API_URL } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema from '@/src/schema/order';

const BASE_URL = `${API_URL}/orders`;

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
  orderId: string;
  body: MeetUpBody;
  meetupType: 'collection' | 'delivery';
};

export default function useSetCollection() {
  return useMutation({
    mutationKey: ['set-collection'],
    mutationFn: ({ orderId, meetupType, body }: MutationProps) =>
      genericFetch(
        `${BASE_URL}/${orderId}/${meetupType}/details`,
        orderApiSchema,
        {
          method: 'PATCH',
          body: JSON.stringify(meetupSchema.parse(body)),
        }
      ),
  });
}
