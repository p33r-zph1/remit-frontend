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

import OrderDetails from './-components/OrderDetails';
import CrossBorderAgent from './Type/CrossBorder/CrossBorderAgent';
import CrossBorderSelfAgent from './Type/CrossBorderSelf/CrossBorderSelfAgent';
import LocalBuyAgent from './Type/LocalBuy/LocalBuyAgent';
import LocalSellAgent from './Type/LocalSell/LocalSellAgent';

export default function AgentOrderDetails() {
  const { data: order, isFetching, refetch } = useOrderDetails();

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
    fees,
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
        orderDetails={{ ...orderDetails, isComputed: isRecipientAgent }}
        isRecipientCustomer={false}
      />

      <div className="divider" />

      {(() => {
        switch (orderType) {
          case 'CROSS_BORDER_REMITTANCE':
          case 'CROSS_BORDER_SELF_REMITTANCE': {
            const { senderAgentId, recipientAgentId } = order;

            const isSender = userId === senderAgentId;
            const isRecipient = userId === recipientAgentId;

            const agentFee = isSender
              ? fees.senderAgent
              : isRecipient
                ? fees.recipientAgent
                : undefined;

            const transferInfo = {
              ...transferDetails.recipient,
              isComputed: isRecipient,
            } satisfies Parameters<typeof formatTranferInfo>[0];

            return (
              <OrderDetails
                priceOracleRates={priceOracleRates}
                platformFee={fees.platform}
                agentFee={agentFee}
                summary={{
                  message: 'Exact cash to deliver',
                  amount: formatTranferInfo(transferInfo),
                }}
              />
            );
          }

          case 'LOCAL_BUY_STABLECOINS':
            return (
              <OrderDetails
                priceOracleRates={priceOracleRates}
                platformFee={fees.platform}
                agentFee={fees.senderAgent}
                summary={{
                  message: 'Exact token amount to release',
                  amount: formatEscrowDetails(escrowDetails),
                }}
              />
            );

          case 'LOCAL_SELL_STABLECOINS': {
            const { recipientAgentId } = order;

            const isRecipient = userId === recipientAgentId;

            const transferInfo = {
              ...transferDetails.recipient,
              isComputed: isRecipient,
            } satisfies Parameters<typeof formatTranferInfo>[0];

            return (
              <OrderDetails
                priceOracleRates={priceOracleRates}
                platformFee={fees.platform}
                agentFee={fees.recipientAgent}
                summary={{
                  message: 'Exact cash to deliver',
                  amount: formatTranferInfo(transferInfo),
                }}
              />
            );
          }
        }
      })()}

      {!isOrderSettled(timelineStatus) && (
        <CountdownCard
          pendingLabel="Time Remaining"
          completionLabel="Transaction expired"
          endDate={expiresAt}
        />
      )}

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

          case 'CROSS_BORDER_SELF_REMITTANCE': {
            const { senderAgentId, recipientAgentId } = order;

            const agentRole = {
              isSender: userId === senderAgentId,
              isRecipient: userId === recipientAgentId,
            };

            return <CrossBorderSelfAgent role={agentRole} {...order} />;
          }

          case 'LOCAL_BUY_STABLECOINS':
            return <LocalBuyAgent {...order} />;

          case 'LOCAL_SELL_STABLECOINS':
            return <LocalSellAgent {...order} />;

          default:
            return null;
        }
      })()}

      <TransferTimeline
        timeline={transferTimeline}
        isFetching={isFetching}
        refetch={refetch}
      />
    </section>
  );
}
