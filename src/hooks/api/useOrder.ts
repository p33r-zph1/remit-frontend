import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema from '@/src/schema/order';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

export type SingleOrder = {
  orderId: string;
};

export const orderQueryOptions = ({ orderId }: SingleOrder) =>
  queryOptions({
    queryKey: ['order', orderId],
    queryFn: () => genericFetch(`${BASE_URL}/${orderId}`, orderApiSchema),
    select: response => response.data,
    refetchInterval: 10_000,
  });

export default function useOrder(
  props: Parameters<typeof orderQueryOptions>[0]
) {
  return useSuspenseQuery(orderQueryOptions(props));
}
