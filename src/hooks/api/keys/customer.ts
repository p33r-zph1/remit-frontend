import type { CustomerQueryProps } from '../useGetCustomer';

export const customerKeys = {
  /**
   *  @description all queries for **customers**.
   *  @example
   *  queryClient.removeQueries({ queryKey: customerKeys.all })
   *  queryClient.invalidateQueries({ queryKey: customerKeys[*] })
   */
  all: ['customers'] as const,

  /**
   * @description queries a **single** customer.
   * @example
   * queryOptions({ queryKey: customerKeys.listItem(props) })
   */
  listItem: ({ customerId }: CustomerQueryProps) =>
    [...customerKeys.all, 'list', customerId] as const,
};
