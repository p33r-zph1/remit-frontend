import { useMemo } from 'react';

import CountdownCard from '@/src/components/Card/CountdownCard';
import OrderDetailsNav from '@/src/components/Nav/OrderDetailsNav';
import TransferTimeline from '@/src/components/Timeline/TransferTimeline';
import useAuth from '@/src/hooks/useAuth';
import useOrderDetails from '@/src/hooks/useOrderDetails';
import { formatEscrowDetails } from '@/src/schema/escrow';
import type { Commission } from '@/src/schema/fees';
import {
  getOrderDetails,
  isUserRecipient,
  isUserRecipientAgent,
} from '@/src/schema/order';
import { formatTranferInfo } from '@/src/schema/order/transfer-info';
import { isOrderSettled } from '@/src/schema/order/transfer-timeline';

import OrderDetails from './-components/OrderDetails';
import CrossBorderCustomer from './Type/CrossBorder/CrossBorderCustomer';
import CrossBorderSelfCustomer from './Type/CrossBorderSelf/CrossBorderSelfCustomer';
import LocalBuyCustomer from './Type/LocalBuy/LocalBuyCustomer';
import LocalSellCustomer from './Type/LocalSell/LocalSellCustomer';

export default function CustomerOrderDetails() {
  const { data: order, isFetching, refetch } = useOrderDetails();

  const { user: userId } = useAuth();

  const {
    orderType,
    orderStatus,
    transferLabel,
    transferTimeline,
    transferDetails,
    escrowDetails,
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
        orderDetails={{ ...orderDetails, isComputed: isRecipientCustomer }}
        label={transferLabel}
        isRecipientCustomer={isRecipientCustomer}
      />

      <div className="divider" />

      {(() => {
        switch (orderType) {
          case 'CROSS_BORDER_REMITTANCE': {
            const { senderId, recipientId } = order;

            const isSender = userId === senderId;
            const isRecipient = userId === recipientId;

            const message =
              timelineStatus === 'CASH_COLLECTED' ||
              timelineStatus === 'ESCROW_DEPOSITED' ||
              timelineStatus === 'DELIVERY_MEETUP_SET' ||
              timelineStatus === 'CASH_DELIVERED' ||
              timelineStatus === 'ESCROW_RELEASED'
                ? 'Exact cash given'
                : 'Exact cash to give';

            const amount = isSender
              ? formatTranferInfo({
                  ...transferDetails.sender,
                  isComputed: false,
                })
              : isRecipient
                ? formatTranferInfo({
                    ...transferDetails.recipient,
                    isComputed: true,
                  })
                : undefined;

            const agentFeeArr: (Commission & { label: string })[] = [];

            agentFeeArr.push({
              ...fees.senderAgent,
              label: 'Sender agent fee',
            });

            if (fees.recipientAgent) {
              agentFeeArr.push({
                ...fees.recipientAgent,
                label: 'Recipient agent fee',
              });
            }

            return (
              <OrderDetails
                priceOracleRates={priceOracleRates}
                platformFee={fees.platform}
                agentFee={agentFeeArr}
                summary={amount ? { message, amount } : undefined}
              />
            );
          }

          case 'CROSS_BORDER_SELF_REMITTANCE': {
            const message =
              timelineStatus === 'CASH_COLLECTED' ||
              timelineStatus === 'ESCROW_DEPOSITED' ||
              timelineStatus === 'SENDER_ARRIVED' ||
              timelineStatus === 'DELIVERY_MEETUP_SET' ||
              timelineStatus === 'CASH_DELIVERED' ||
              timelineStatus === 'ESCROW_RELEASED'
                ? 'Exact cash given'
                : 'Exact cash to give';

            const amount = formatTranferInfo({
              ...transferDetails.sender,
              isComputed: false,
            });

            return (
              <OrderDetails
                priceOracleRates={priceOracleRates}
                platformFee={fees.platform}
                agentFee={[
                  { ...fees.senderAgent, label: 'Sender agent fee' },
                  { ...fees.recipientAgent, label: 'Recipient agent fee' },
                ]}
                summary={{ message, amount }}
              />
            );
          }

          case 'LOCAL_BUY_STABLECOINS':
            return (
              <OrderDetails
                priceOracleRates={priceOracleRates}
                platformFee={fees.platform}
                agentFee={[{ ...fees.senderAgent, label: 'Sender agent fee' }]}
                summary={{
                  message:
                    timelineStatus === 'CASH_COLLECTED' ||
                    timelineStatus === 'ESCROW_RELEASED'
                      ? 'Exact cash given'
                      : 'Exact cash to give',
                  amount: formatTranferInfo({
                    ...transferDetails.sender,
                    isComputed: false,
                  }),
                }}
              />
            );

          case 'LOCAL_SELL_STABLECOINS':
            return (
              <OrderDetails
                priceOracleRates={priceOracleRates}
                platformFee={fees.platform}
                agentFee={[
                  { ...fees.recipientAgent, label: 'Recipient agent fee' },
                ]}
                summary={{
                  message: escrowDetails.depositTransaction
                    ? 'Exact token amount released'
                    : 'Exact token amount to release',
                  amount: formatEscrowDetails(escrowDetails),
                }}
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

      <TransferTimeline
        timeline={transferTimeline}
        isFetching={isFetching}
        refetch={refetch}
      />
    </section>
  );
}
