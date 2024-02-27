import CountdownCard from '@/src/components/Card/CountdownCard';
import OrderDetailsNav from '@/src/components/Nav/OrderDetailsNav';
import TransferTimeline from '@/src/components/Timeline/TransferTimeline';
import useAuth from '@/src/hooks/useAuth';
import useOrderDetails from '@/src/hooks/useOrderDetails';
import { getRecipientTransferDetails } from '@/src/schema/order/transfer-details';
import { isOrderSettled } from '@/src/schema/order/transfer-timeline';

import CrossBorderAgent from './Type/CrossBorder/CrossBorderAgent';
import LocalSellAgent from './Type/LocalSell/LocalSellAgent';

export default function AgentOrderDetails() {
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
        isRecipientCustomer={false}
      />

      <div className="divider" />

      {!isOrderSettled(timelineStatus) && <CountdownCard endDate={expiresAt} />}

      {(() => {
        switch (orderType) {
          case 'CROSS_BORDER_REMITTANCE': {
            const { senderAgentId, recipientAgentId } = order;

            const agentRole = {
              isSender: userId === senderAgentId,
              isRecipient: userId === recipientAgentId,
            };

            return <CrossBorderAgent role={agentRole} {...order} />;
          }

          case 'LOCAL_SELL_STABLECOINS':
            return <LocalSellAgent {...order} />;

          default:
            return null;
        }
      })()}

      <TransferTimeline timeline={transferTimeline} />
    </section>
  );
}
