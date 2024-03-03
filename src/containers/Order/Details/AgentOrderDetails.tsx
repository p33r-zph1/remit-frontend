import { useMemo } from 'react';

import CountdownCard from '@/src/components/Card/CountdownCard';
import OrderDetailsNav from '@/src/components/Nav/OrderDetailsNav';
import TransferTimeline from '@/src/components/Timeline/TransferTimeline';
import useAuth from '@/src/hooks/useAuth';
import useOrderDetails from '@/src/hooks/useOrderDetails';
import { formatEscrowDetails } from '@/src/schema/escrow';
import { getOrderDetails, isUserRecipientAgent } from '@/src/schema/order';
import { formatTranferInfo } from '@/src/schema/order/transfer-info';
import { isOrderSettled } from '@/src/schema/order/transfer-timeline';

import FxRate from './-components/FxRate';
import CrossBorderAgent from './Type/CrossBorder/CrossBorderAgent';
import LocalBuyAgent from './Type/LocalBuy/LocalBuyAgent';
import LocalSellAgent from './Type/LocalSell/LocalSellAgent';

export default function AgentOrderDetails() {
  const { order } = useOrderDetails();

  const { user: userId } = useAuth();

  const {
    orderType,
    orderStatus,
    transferTimeline,
    transferDetails,
    escrowDetails,
    transferTimelineStatus: timelineStatus,
    expiresAt,
    priceOracleRates,
  } = order;

  const isRecipientAgent = useMemo(
    () => isUserRecipientAgent(order, userId),
    [order, userId]
  );

  const orderDetails = useMemo(
    () => getOrderDetails(order, false, isRecipientAgent),
    [isRecipientAgent, order]
  );

  return (
    <section className="flex flex-col space-y-12">
      <OrderDetailsNav
        orderStatus={orderStatus}
        timelineStatus={timelineStatus}
        orderDetails={orderDetails}
        isRecipientCustomer={false}
      />

      <div className="divider" />

      {(() => {
        if (
          timelineStatus === 'DELIVERY_MEETUP_SET' ||
          timelineStatus === 'COLLECTION_MEETUP_SET'
        ) {
          const fxRate = `${Object.keys(priceOracleRates)} at ${Object.values(
            priceOracleRates
          )}`;

          switch (orderType) {
            case 'CROSS_BORDER_REMITTANCE':
            case 'CROSS_BORDER_SELF_REMITTANCE':
              return (
                <FxRate
                  fxRate={fxRate}
                  assetToDeliver="cash"
                  assetDetails={formatTranferInfo(transferDetails.recipient)}
                />
              );

            case 'LOCAL_BUY_STABLECOINS':
              return (
                <FxRate
                  fxRate={fxRate}
                  assetToDeliver="token"
                  assetDetails={formatEscrowDetails(escrowDetails)}
                />
              );

            case 'LOCAL_SELL_STABLECOINS':
              return (
                <FxRate
                  fxRate={fxRate}
                  assetToDeliver="cash"
                  assetDetails={formatTranferInfo(transferDetails.recipient)}
                />
              );
          }
        }
      })()}

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

          case 'LOCAL_BUY_STABLECOINS':
            return <LocalBuyAgent {...order} />;

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
