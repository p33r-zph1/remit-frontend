import useAuth from '../../hooks/useAuth';
import OrderItem from '../../components/Item/OrderItem';
import useOrders, { OrdersQueryProps } from '../../hooks/api/useOrders';
import EmptyOrder from '../../components/Empty/EmptyOrder';

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
