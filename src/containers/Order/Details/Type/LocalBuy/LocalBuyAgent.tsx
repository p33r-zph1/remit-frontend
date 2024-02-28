import type { LocalBuyOrder } from '@/src/schema/order';

import ApproveERC20 from '../../-components/ApproveERC20';
import AgentMeetup from '../../-components/Meetup/AgentMeetup';
import Receive from '../../-components/Receive';
import AgentTakeOrder from '../../-components/TakeOrder/AgentTakeOrder';

type Props = LocalBuyOrder;

export default function LocalBuyAgent(props: Props) {
  const {
    transferTimelineStatus: timelineStatus,
    orderId,
    senderId,
    contactDetails,
    collectionDetails,
    transferDetails,
    escrowDetails,
    fees,
  } = props;

  switch (timelineStatus) {
    case 'PENDING':
      return (
        <AgentTakeOrder
          orderId={orderId}
          orderType="LOCAL_BUY_STABLECOINS"
          commission={fees.senderAgent}
        />
      );

    case 'SENDER_AGENT_ACCEPTED':
      return (
        <ApproveERC20
          orderId={orderId}
          orderType="LOCAL_BUY_STABLECOINS"
          transferInfo={transferDetails.sender}
          escrowDetails={escrowDetails}
        />
      );

    case 'ESCROW_DEPOSITED':
      return (
        <AgentMeetup
          orderId={orderId}
          orderType="LOCAL_BUY_STABLECOINS"
          meetupType="collection"
        />
      );

    case 'COLLECTION_MEETUP_SET':
      return (
        <Receive
          orderId={orderId}
          orderType="LOCAL_BUY_STABLECOINS"
          asset="cash"
          sender={senderId}
          senderContact={contactDetails.sender}
          locationDetails={collectionDetails}
          transferInfo={transferDetails.sender}
        />
      );

    default:
      return null;
  }
}
