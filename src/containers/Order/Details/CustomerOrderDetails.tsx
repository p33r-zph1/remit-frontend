import { useMemo } from 'react';

import CountdownCard from '@/src/components/Card/CountdownCard';
import OrderDetailsNav from '@/src/components/Nav/OrderDetailsNav';
import TransferTimeline from '@/src/components/Timeline/TransferTimeline';
import useAuth from '@/src/hooks/useAuth';
import useOrderDetails from '@/src/hooks/useOrderDetails';
import {
  getOrderDetails,
  isUserRecipient,
  isUserRecipientAgent,
} from '@/src/schema/order';
import { isOrderSettled } from '@/src/schema/order/transfer-timeline';

import OrderDetails from './-components/OrderDetails';
import CrossBorderCustomer from './Type/CrossBorder/CrossBorderCustomer';
import CrossBorderSelfCustomer from './Type/CrossBorderSelf/CrossBorderSelfCustomer';
import LocalBuyCustomer from './Type/LocalBuy/LocalBuyCustomer';
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
    priceOracleRates,
    fees,
  } = order;

  const isRecipientCustomer = useMemo(
    () => isUserRecipient(order, userId),
    [order, userId]
  );

  const isRecipientAgent = useMemo(
    () => isUserRecipientAgent(order, userId),
    [order, userId]
  );

  const orderDetails = useMemo(
    () => getOrderDetails(order, isRecipientCustomer, isRecipientAgent),
    [isRecipientAgent, isRecipientCustomer, order]
  );

  return (
    <section className="flex flex-col space-y-12">
      <OrderDetailsNav
        orderStatus={orderStatus}
        timelineStatus={timelineStatus}
        orderDetails={orderDetails}
        isRecipientCustomer={isRecipientCustomer}
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

            return (
              <OrderDetails
                priceOracleRates={priceOracleRates}
                platformFee={fees.platform}
                agentFee={agentFee}
              />
            );
          }

          case 'LOCAL_BUY_STABLECOINS':
            return (
              <OrderDetails
                priceOracleRates={priceOracleRates}
                platformFee={fees.platform}
                agentFee={fees.senderAgent}
              />
            );

          case 'LOCAL_SELL_STABLECOINS':
            return (
              <OrderDetails
                priceOracleRates={priceOracleRates}
                platformFee={fees.platform}
                agentFee={fees.recipientAgent}
              />
            );
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
            const { senderId, recipientId } = order;

            const customerRole = {
              isSender: userId === senderId,
              isRecipient: userId === recipientId,
            };

            return <CrossBorderCustomer role={customerRole} {...order} />;
          }

          case 'CROSS_BORDER_SELF_REMITTANCE':
            return <CrossBorderSelfCustomer {...order} />;

          case 'LOCAL_BUY_STABLECOINS':
            return <LocalBuyCustomer {...order} />;

          case 'LOCAL_SELL_STABLECOINS':
            return <LocalSellCustomer {...order} />;

          default:
            return null;
        }
      })()}

      <TransferTimeline timeline={transferTimeline} />
    </section>
  );
}
