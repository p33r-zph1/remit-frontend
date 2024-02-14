import EmptyOrder from '@/src/components/Empty/EmptyOrder';
import OrderItem from '@/src/components/Item/OrderItem';
import useOrders, { type OrdersQueryProps } from '@/src/hooks/api/useOrders';
import useAuth from '@/src/hooks/useAuth';

type Props = OrdersQueryProps;

export default function OrderList(props: Props) {
  const { user } = useAuth();

  const { data: orderList } = useOrders(props);

  if (orderList.orders.length === 0) return <EmptyOrder />;

  return orderList.orders.map(order => (
    <OrderItem
      {...order}
      key={order.orderId}
      isRecipient={user === order.senderId}
    />
  ));
}
