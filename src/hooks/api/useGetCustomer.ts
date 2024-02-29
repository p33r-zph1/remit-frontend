import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { makeApiUrl } from '@/src/configs/env';
import { genericFetch } from '@/src/schema/api/fetch';
import customerApiSchema from '@/src/schema/customer';

import { customerKeys } from './keys/customer';

export type CustomerQueryProps = {
  customerId: string;
};

export const customerQueryOptions = ({ customerId }: CustomerQueryProps) =>
  queryOptions({
    queryKey: customerKeys.listItem({ customerId }),
    queryFn: () => {
      const apiUrl = makeApiUrl(`/customers/${customerId}`);
      return genericFetch(apiUrl, customerApiSchema);
    },
    select: response => response.data,
    refetchInterval: 15_000,
  });

export default function useGetCustomer(
  props: Parameters<typeof customerQueryOptions>[0]
) {
  return useSuspenseQuery(customerQueryOptions(props));
}
