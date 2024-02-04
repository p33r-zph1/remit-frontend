import useOrderHistory from '../hooks/api/useOrderHistory';

import HistoryItem from '../components/Item/HistoryItem';
import { selectRecipientValue, selectSenderValue } from '../schema/order';
import EmptyHistory from '../components/Empty/EmptyHistory';
import useAuth from '../hooks/useAuth';

export default function HistoryList() {
  const { user } = useAuth();

  const { data: orderHistory } = useOrderHistory({
    pageNumber: 1,
    pageSize: 10,
  });

  if (orderHistory.orders.length === 0) return <EmptyHistory />;

  return orderHistory.orders.map(order => (
    <HistoryItem
      key={order.orderId}
      orderId={order.orderId}
      recipient={order.recipientId}
      status={order.orderStatus}
      sentAmount={selectSenderValue(order)}
      conversionAmount={selectRecipientValue(order)}
      isRecipient={user === order.recipientId}
    />
  ));
}
