import useAuth from '../hooks/useAuth';
import OrderItem from '../components/Item/OrderItem';
import useOrders from '../hooks/api/useOrders';
import EmptyHistory from '../components/Empty/EmptyHistory';

export default function OrderList() {
  const { user } = useAuth();

  const { data: orderList } = useOrders({
    pageNumber: 1,
    pageSize: 10,
  });

  if (orderList.orders.length === 0) return <EmptyHistory isCustomer={false} />;

  return orderList.orders.map(order => (
    <OrderItem
      {...order}
      key={order.orderId}
      isRecipient={user === order.senderId}
    />
  ));
}
