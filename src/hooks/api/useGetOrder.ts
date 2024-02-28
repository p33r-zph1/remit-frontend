import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema from '@/src/schema/order';

import { orderKeys } from './keys/order.key';

export type OrderQueryProps = {
  orderId: string;
};

export const orderQueryOptions = ({ orderId }: OrderQueryProps) =>
  queryOptions({
    queryKey: orderKeys.listItem({ orderId }),
    queryFn: () => {
      const apiUrl = makeApiUrl(`/orders/${orderId}`);
      return genericFetch(apiUrl, orderApiSchema);
    },
    select: response => response.data,
    refetchInterval: 10_000,
  });

export default function useGetOrder(
  props: Parameters<typeof orderQueryOptions>[0]
) {
  return useSuspenseQuery(orderQueryOptions(props));
}
