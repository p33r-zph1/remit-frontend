import EmptyHistory from '@/src/components/Empty/EmptyHistory';
import HistoryItem from '@/src/components/Item/HistoryItem';
import useOrders from '@/src/hooks/api/useOrders';
import useAuth from '@/src/hooks/useAuth';

export default function HistoryList() {
  const { user, hasGroup } = useAuth();

  const { data: order } = useOrders({
    pageNumber: 1,
    pageSize: 10,
  });

  if (order.orders.length === 0)
    return <EmptyHistory isCustomer={hasGroup('customer')} />;

  return order.orders.map(order => (
    <HistoryItem
      {...order}
      key={order.orderId}
      isRecipient={user === order.recipientId}
    />
  ));
}
