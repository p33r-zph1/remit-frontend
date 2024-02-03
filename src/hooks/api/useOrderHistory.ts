import { useSuspenseQuery } from '@tanstack/react-query';

import { genericFetch } from '../../schema/api/fetch';
import { Options, defaultOptions } from '../../schema/api';
import orderListApiSchema from '../../schema/order-list';

const BASE_URL =
  'https://35ipxeiky6.execute-api.ap-southeast-1.amazonaws.com/develop/orders';

export type Pair = {
  pageSize: number;
  pageNumber: number;
};

export default function useOrderHistory(
  { pageSize, pageNumber }: Partial<Pair>,
  { refetchInterval }: Options = defaultOptions
) {
  return useSuspenseQuery({
    queryKey: [
      'order-history',
      `?pageSize=${pageSize}&pageNumber=${pageNumber}`,
    ],
    queryFn: () =>
      genericFetch(
        `${BASE_URL}?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        orderListApiSchema
      ),
    select: response => response.data,
    refetchInterval,
  });
}
