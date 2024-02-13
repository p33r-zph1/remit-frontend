import { useMutation } from '@tanstack/react-query';

import { genericFetch } from '../../schema/api/fetch';
import orderApiSchema from '../../schema/order';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

export type MutationProps = {
  orderId: string;
  meetupType: 'collection' | 'delivery';
};

export default function useCollectCash() {
  return useMutation({
    mutationKey: ['collect-cash'],
    mutationFn: ({ orderId, meetupType }: MutationProps) =>
      genericFetch(
        `${BASE_URL}/${orderId}/${meetupType}/confirm`,
        orderApiSchema,
        {
          method: 'PATCH',
        }
      ),
  });
}
