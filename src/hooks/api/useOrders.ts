import {
  infiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderListApiSchema, { type OrderListApi } from '@/src/schema/order-list';

import { orderKeys } from './keys/order.key';

export type OrdersQueryProps = {
  pageSize: number;
  status?: 'active' | 'open';
};

export const ordersQueryOptions = ({ pageSize, status }: OrdersQueryProps) =>
  infiniteQueryOptions<OrderListApi>({
    queryKey: orderKeys.paginatedList({ pageSize, status }),
    initialPageParam: 1,
    getNextPageParam: ({ data: { hasNextPage, pageNumber } }) => {
      if (hasNextPage) return pageNumber + 1;
    },
    getPreviousPageParam: ({ data: { hasPreviousPage, pageNumber } }) => {
      if (hasPreviousPage) return pageNumber - 1;
    },
    queryFn: ({ pageParam }) => {
      const url = makeApiUrl('/orders');
      url.searchParams.append('pageSize', String(pageSize));
      url.searchParams.append('pageNumber', String(pageParam));

      if (status) url.searchParams.append('status', status);

      return genericFetch(url, orderListApiSchema);
    },
  });

export default function useOrders(
  props: Parameters<typeof ordersQueryOptions>[0]
) {
  return useSuspenseInfiniteQuery(ordersQueryOptions(props));
}
