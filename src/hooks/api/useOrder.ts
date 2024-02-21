import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema from '@/src/schema/order';

import { orderKeys } from './keys/order';

export type OrderQueryProps = {
  orderId: string;
};

export const orderQueryOptions = ({ orderId }: OrderQueryProps) =>
  queryOptions({
    queryKey: orderKeys.listItem({ orderId }),
    queryFn: () =>
      genericFetch(makeApiUrl(`/orders/${orderId}`), orderApiSchema),
    select: response => response.data,
    refetchInterval: 10_000,
  });

export default function useOrder(
  props: Parameters<typeof orderQueryOptions>[0]
) {
  return useSuspenseQuery(orderQueryOptions(props));
}
