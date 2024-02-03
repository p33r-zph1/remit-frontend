// import useAuth from '../hooks/useAuth';
import OrderItem from '../components/Item/OrderItem';

export default function OrderList() {
  //   const { user } = useAuth();

  //   const { data: orderList } = useOrderList({
  //     pageNumber: 1,
  //     pageSize: 10,
  //   });

  //   if (orderList.orders.length === 0) return <EmptyHistory />;

  //   return orderList.orders.map(order => (
  //     <HistoryItem
  //       key={order.orderId}
  //       orderId={order.orderId}
  //       recipient={order.recipientId}
  //       status={order.orderStatus}
  //       sentAmount={selectSenderValue(order)}
  //       conversionAmount={selectRecipientValue(order)}
  //       isRecipient={user === order.senderId}
  //     />
  //   ));

  return (
    <>
      <OrderItem
        recipient="1243455"
        status="IN_PROGRESS"
        sentAmount="12,497,549.47 SGD"
        conversionAmount="550,219.65 UA"
        orderId="1234555"
        isRecipient
      />
    </>
  );
}
