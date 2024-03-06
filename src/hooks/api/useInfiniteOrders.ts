import {
  infiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderListApiSchema, { type OrderListApi } from '@/src/schema/order-list';

import { orderKeys } from './keys/order.key';

export type InfiniteOrdersQueryProps = {
  pageSize: number;
  status?: 'active' | 'open';
};

export const ordersInfiniteQueryOptions = ({
  pageSize,
  status,
}: InfiniteOrdersQueryProps) =>
  infiniteQueryOptions<OrderListApi>({
    queryKey: orderKeys.infiniteList({ pageSize, status }),
    initialPageParam: 1,
    getNextPageParam: ({ data: { hasNextPage, pageNumber } }) => {
      if (hasNextPage) return pageNumber + 1;
    },
    getPreviousPageParam: ({ data: { hasPreviousPage, pageNumber } }) => {
      if (hasPreviousPage) return pageNumber - 1;
    },
    queryFn: ({ pageParam }) => {
      const apiUrl = makeApiUrl('/orders');
      apiUrl.searchParams.append('pageSize', String(pageSize));
      apiUrl.searchParams.append('pageNumber', String(pageParam));

      if (status) apiUrl.searchParams.append('status', status);

      return genericFetch(apiUrl, orderListApiSchema);
    },
  });

export default function useInfiniteOrders(
  props: Parameters<typeof ordersInfiniteQueryOptions>[0]
) {
  return useSuspenseInfiniteQuery(ordersInfiniteQueryOptions(props));
}
