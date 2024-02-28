import type { LocalSellOrder } from '@/src/schema/order';

import Deliver from '../../-components/Deliver';
import AgentMeetup from '../../-components/Meetup/AgentMeetup';
import AgentTakeOrder from '../../-components/TakeOrder/AgentTakeOrder';

type Props = LocalSellOrder;

export default function LocalSellAgent(props: Props) {
  const {
    transferTimelineStatus: timelineStatus,
    orderId,
    fees,
    recipientId,
    deliveryDetails,
    contactDetails,
  } = props;

  switch (timelineStatus) {
    case 'PENDING':
      return (
        <AgentTakeOrder
          orderId={orderId}
          orderType="LOCAL_SELL_STABLECOINS"
          commission={fees.recipientAgent}
        />
      );

    case 'ESCROW_DEPOSITED':
      return (
        <AgentMeetup
          orderId={orderId}
          orderType="LOCAL_SELL_STABLECOINS"
          meetupType="delivery"
        />
      );

    case 'DELIVERY_MEETUP_SET':
      return (
        <Deliver
          asset="cash"
          recipient={recipientId}
          recipientContact={contactDetails.recipient}
          locationDetails={deliveryDetails}
        />
      );

    default:
      return null;
  }
}
