import { Fragment, memo } from 'react';

import EmptyOrder from '@/src/components/Empty/EmptyOrder';
import OrderItem from '@/src/components/Item/OrderItem';
import useGetOrders, {
  type OrdersQueryProps,
} from '@/src/hooks/api/useGetOrders';
import useAuth from '@/src/hooks/useAuth';
import {
  getOrderDetails,
  getRecipient,
  isUserRecipient,
} from '@/src/schema/order';

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
        } = order;

        const recipientId = getRecipient(order);
        const isRecipient = isUserRecipient(order, userId);
        const orderDetails = getOrderDetails(order, isRecipient);

        return (
          <OrderItem
            key={orderId}
            orderId={orderId}
            orderStatus={orderStatus}
            timelineStatus={timelineStatus}
            orderDetails={orderDetails}
            createdAt={createdAt}
            recipientId={recipientId}
            isRecipient={isRecipient}
          />
        );
      })}
    </Fragment>
  ));
});
