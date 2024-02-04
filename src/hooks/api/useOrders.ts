import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { genericFetch } from '../../schema/api/fetch';
import orderListApiSchema from '../../schema/order-list';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

export type Pair = {
  pageSize: number;
  pageNumber: number;
};

export const ordersQueryOptions = ({ pageSize, pageNumber }: Pair) =>
  queryOptions({
    queryKey: ['orders', pageSize, pageNumber],
    queryFn: () =>
      genericFetch(
        `${BASE_URL}?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        orderListApiSchema
      ),
    select: response => response.data,
    refetchInterval: 10_000,
  });

export default function useOrders(
  props: Parameters<typeof ordersQueryOptions>[0]
) {
  return useSuspenseQuery(ordersQueryOptions(props));
}
