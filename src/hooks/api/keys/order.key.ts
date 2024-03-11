import type { OrderQueryProps } from '../useGetOrder';
import type { InfiniteOrdersQueryProps } from '../useInfiniteOrders';

export const orderKeys = {
  /**
   *  @description all queries for **orders**.
   *  @example
   *  queryClient.removeQueries({ queryKey: orderKeys.all })
   *  queryClient.invalidateQueries({ queryKey: orderKeys[*] })
   */
  all: ['orders'] as const,

  /**
   * @description queries a paginated **orders list**.
   * @example
   * queryOptions({ queryKey: orderKeys.paginatedList(props) })
   */
  infiniteList: (props: InfiniteOrdersQueryProps) =>
    [...orderKeys.all, 'list', { ...props }] as const,

  /**
   * @description queries a **single** order.
   * @example
   * queryOptions({ queryKey: orderKeys.listItem(props) })
   */
  listItem: ({ orderId }: OrderQueryProps) =>
    [...orderKeys.all, 'list', orderId] as const,
};
