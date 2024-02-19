import type { OrderQueryProps } from '../useOrder';
import type { OrdersQueryProps } from '../useOrders';

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
  paginatedList: (props: OrdersQueryProps) =>
    [...orderKeys.all, 'paginated_list', { ...props }] as const,

  /**
   * @description queries a **single** order.
   * @example
   * queryOptions({ queryKey: orderKeys.listItem(props) })
   */
  listItem: (props: OrderQueryProps) =>
    [...orderKeys.all, 'list_item', { ...props }] as const,
};
