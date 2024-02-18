import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { API_URL } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import orderApiSchema from '@/src/schema/order';

const BASE_URL = `${API_URL}/orders`;

export type OrderQueryProps = {
  orderId: string;
};

export const orderQueryOptions = ({ orderId }: OrderQueryProps) =>
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
