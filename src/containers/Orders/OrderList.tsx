import EmptyOrder from '../../components/Empty/EmptyOrder';
import OrderItem from '../../components/Item/OrderItem';
import useOrders, { type OrdersQueryProps } from '../../hooks/api/useOrders';
import useAuth from '../../hooks/useAuth';

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
