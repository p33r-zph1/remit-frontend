import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { API_URL } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderListApiSchema from '@/src/schema/order-list';

import { orderKeys } from './keys/order';

const BASE_URL = `${API_URL}/orders`;

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
    queryKey: orderKeys.paginatedList({ pageSize, pageNumber, status }),
    queryFn: () =>
      genericFetch(
        `${BASE_URL}?pageSize=${pageSize}&pageNumber=${pageNumber}&status=${status}`,
        orderListApiSchema
      ),
    select: response => response.data,
    refetchInterval: 20_000,
  });

export default function useOrders(
  props: Parameters<typeof ordersQueryOptions>[0]
) {
  return useSuspenseQuery(ordersQueryOptions(props));
}
