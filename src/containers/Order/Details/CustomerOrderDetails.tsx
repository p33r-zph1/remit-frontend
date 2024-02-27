import CountdownCard from '@/src/components/Card/CountdownCard';
import OrderDetailsNav from '@/src/components/Nav/OrderDetailsNav';
import TransferTimeline from '@/src/components/Timeline/TransferTimeline';
import useAuth from '@/src/hooks/useAuth';
import useOrderDetails from '@/src/hooks/useOrderDetails';
import { isUserRecipient } from '@/src/schema/order';
import { getRecipientTransferDetails } from '@/src/schema/order/transfer-details';
import { isOrderSettled } from '@/src/schema/order/transfer-timeline';

import CrossBorderCustomer from './Type/CrossBorder/CrossBorderCustomer';
import LocalSellCustomer from './Type/LocalSell/LocalSellCustomer';

export default function CustomerOrderDetails() {
  const { order } = useOrderDetails();

  const { user: userId } = useAuth();

  const {
    orderType,
    transferTimeline,
    orderStatus,
    transferTimelineStatus: timelineStatus,
    expiresAt,
    transferDetails,
  } = order;

  return (
    <section className="flex flex-col space-y-12">
      <OrderDetailsNav
        orderStatus={orderStatus}
        timelineStatus={timelineStatus}
        transferInfo={getRecipientTransferDetails(transferDetails)}
        isRecipientCustomer={isUserRecipient(order, userId)}
      />

      <div className="divider" />

      {!isOrderSettled(timelineStatus) && <CountdownCard endDate={expiresAt} />}

      {(() => {
        switch (orderType) {
          case 'CROSS_BORDER_REMITTANCE': {
            const { senderId, recipientId } = order;

            const customerRole = {
              isSender: userId === senderId,
              isRecipient: userId === recipientId,
            };

            return <CrossBorderCustomer role={customerRole} {...order} />;
          }

          case 'LOCAL_SELL_STABLECOINS': {
            return <LocalSellCustomer {...order} />;
          }

          default:
            return null;
        }
      })()}

      <TransferTimeline timeline={transferTimeline} />
    </section>
  );
}
