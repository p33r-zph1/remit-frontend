import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderListApiSchema from '@/src/schema/order-list';

import { orderKeys } from './keys/order';

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
    queryFn: () => {
      const url = makeApiUrl(`/orders`);
      url.searchParams.append('pageSize', String(pageSize));
      url.searchParams.append('pageNumber', String(pageNumber));

      if (status) url.searchParams.append('status', status);

      return genericFetch(url, orderListApiSchema);
    },
    select: response => response.data,
    refetchInterval: 20_000,
  });

export default function useOrders(
  props: Parameters<typeof ordersQueryOptions>[0]
) {
  return useSuspenseQuery(ordersQueryOptions(props));
}
