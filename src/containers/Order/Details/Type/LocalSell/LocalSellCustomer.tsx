import type { LocalSellOrder } from '@/src/schema/order';

import ApproveERC20 from '../../-components/ApproveERC20';
import ReceiveWithQr from '../../-components/ReceiveWithQr';

type Props = LocalSellOrder;

export default function LocalSellCustomer(props: Props) {
  const {
    transferTimelineStatus: timelineStatus,
    orderId,
    recipientAgentId,
    contactDetails,
    deliveryDetails,
    escrowDetails,
    transferDetails,
  } = props;

  switch (timelineStatus) {
    case 'RECIPIENT_AGENT_ACCEPTED':
      return (
        <ApproveERC20
          orderId={orderId}
          orderType="LOCAL_SELL_STABLECOINS"
          transferInfo={{ ...transferDetails.recipient, isComputed: true }}
          escrowDetails={escrowDetails}
        />
      );

    case 'DELIVERY_MEETUP_SET':
      return (
        <ReceiveWithQr
          orderId={orderId}
          orderType="LOCAL_SELL_STABLECOINS"
          asset="cash"
          agent={recipientAgentId}
          agentContact={contactDetails.recipientAgent}
          locationDetails={deliveryDetails}
        />
      );

    default:
      return null;
  }
}
