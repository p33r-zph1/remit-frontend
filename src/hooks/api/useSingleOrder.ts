import { useSuspenseQuery } from '@tanstack/react-query';

import { genericFetch } from '../../schema/api/fetch';
import { Options, defaultOptions } from '../../schema/api';
import orderApiSchema from '../../schema/order';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

export type SingleOrder = {
  orderId: string;
};

export default function useSingleOrder(
  { orderId }: SingleOrder,
  { refetchInterval }: Options = defaultOptions
) {
  return useSuspenseQuery({
    queryKey: ['single-order', orderId],
    queryFn: () => genericFetch(`${BASE_URL}/${orderId}`, orderApiSchema),
    select: response => response.data,
    refetchInterval,
  });
}
