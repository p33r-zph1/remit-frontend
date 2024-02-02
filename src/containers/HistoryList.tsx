import useOrderHistory from '../hooks/api/useOrderHistory';

import HistoryItem from '../components/Item/HistoryItem';
import { useCallback } from 'react';
import { Order } from '../schema/order';

export default function HistoryList() {
  const { data: orderHistory } = useOrderHistory({
    pageNumber: 1,
    pageSize: 10,
  });

  console.log({ orderHistory });

  const conversionAmount = useCallback((order: Order) => {
    const { amount, currency } = order.transferDetails.recipient;

    return `${amount} ${currency}`;
  }, []);

  const sentAmount = useCallback((order: Order) => {
    const { amount, currency } = order.transferDetails.sender;

    return `${amount} ${currency}`;
  }, []);

  return orderHistory.orders.map(order => (
    <HistoryItem
      key={order.orderId}
      recipient={order.recipientId}
      status={order.orderStatus}
      sentAmount={sentAmount(order)}
      conversionAmount={conversionAmount(order)}
    />
  ));
}
