import { Fragment, memo } from 'react';

import EmptyOrder from '@/src/components/Empty/EmptyOrder';
import OrderItem from '@/src/components/Item/OrderItem';
import useOrders, { type OrdersQueryProps } from '@/src/hooks/api/useOrders';
import useAuth from '@/src/hooks/useAuth';
import { isRecipient, recipient } from '@/src/schema/order';
import { getTransferInfo } from '@/src/schema/order/transfer-details';

type Props = OrdersQueryProps;

export default memo(function OrderList(props: Props) {
  const { user: userId } = useAuth();

  const { data } = useOrders(props);

  if (data.pages.every(page => page.data.orders.length === 0)) {
    return <EmptyOrder />;
  }

  return data.pages.map(({ data: { orders, pageNumber } }) => (
    <Fragment key={pageNumber}>
      {orders.map(order => {
        const { orderId, orderStatus, createdAt, transferDetails } = order;

        return (
          <OrderItem
            key={orderId}
            orderId={orderId}
            orderStatus={orderStatus}
            transferInfo={getTransferInfo(transferDetails)}
            createdAt={createdAt}
            recipientId={recipient(order)}
            isRecipient={isRecipient(order, userId)}
          />
        );
      })}
    </Fragment>
  ));
});
