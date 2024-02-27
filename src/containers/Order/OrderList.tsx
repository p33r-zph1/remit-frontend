import { Fragment, memo } from 'react';

import EmptyOrder from '@/src/components/Empty/EmptyOrder';
import OrderItem from '@/src/components/Item/OrderItem';
import useGetOrders, {
  type OrdersQueryProps,
} from '@/src/hooks/api/useGetOrders';
import useAuth from '@/src/hooks/useAuth';
import { isRecipient, recipient } from '@/src/schema/order';
import { getTransferInfo } from '@/src/schema/order/transfer-details';

type Props = OrdersQueryProps;

export default memo(function OrderList(props: Props) {
  const { user: userId } = useAuth();

  const { data } = useGetOrders(props);

  if (data.pages.every(page => page.data.orders.length === 0)) {
    return <EmptyOrder />;
  }

  return data.pages.map(({ data: { orders, pageNumber } }) => (
    <Fragment key={pageNumber}>
      {orders.map(order => {
        const {
          orderId,
          orderStatus,
          transferTimelineStatus: timelineStatus,
          createdAt,
          transferDetails,
        } = order;

        return (
          <OrderItem
            key={orderId}
            orderId={orderId}
            orderStatus={orderStatus}
            timelineStatus={timelineStatus}
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
