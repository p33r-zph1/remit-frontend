import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { genericFetch } from '@/src/schema/api/fetch';
import orderListApiSchema from '@/src/schema/order-list';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

export type OrdersQueryProps = {
  pageSize: number;
  pageNumber: number;
  status?: 'active' | 'open';
};

export const ordersQueryOptions = ({
  pageSize,
  pageNumber,
  status,
}: OrdersQueryProps) =>
  queryOptions({
    queryKey: ['orders', pageSize, pageNumber, status],
    queryFn: () =>
      genericFetch(
        `${BASE_URL}?pageSize=${pageSize}&pageNumber=${pageNumber}&status=${status}`,
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
