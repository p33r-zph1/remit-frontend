import HeroNotFound from '@/src/components/Hero/HeroNotFound';
import type { CrossBorderOrder } from '@/src/schema/order';

import ApproveERC20 from '../../-components/ApproveERC20';
import Deliver from '../../-components/Deliver';
import AgentMeetup from '../../-components/Meetup/AgentMeetup';
import Receive from '../../-components/Receive';
import AgentTakeOrder from '../../-components/TakeOrder/AgentTakeOrder';
import AgentWithFormTakeOrder from '../../-components/TakeOrder/AgentWithFormTakeOrder';

type Role = {
  isSender: boolean;
  isRecipient: boolean;
};

type Props = CrossBorderOrder & {
  role: Role;
};

export default function CrossBorderAgent({ role, ...orderProps }: Props) {
  const {
    transferTimelineStatus: timelineStatus,
    orderId,
    senderId,
    recipientId,
    contactDetails,
    collectionDetails,
    deliveryDetails,
    transferDetails,
    escrowDetails,
    fees,
  } = orderProps;

  if (role.isSender) {
    switch (timelineStatus) {
      case 'RECIPIENT_ACCEPTED':
      case 'RECIPIENT_AGENT_ACCEPTED':
        return (
          <AgentWithFormTakeOrder
            orderId={orderId}
            orderType="CROSS_BORDER_REMITTANCE"
            commission={fees.senderAgent}
          />
        );

      case 'ORDER_ACCEPTED':
        return (
          <AgentMeetup
            orderId={orderId}
            orderType="CROSS_BORDER_REMITTANCE"
            meetupType="collection"
          />
        );

      case 'COLLECTION_MEETUP_SET':
        return (
          <Receive
            orderId={orderId}
            orderType="CROSS_BORDER_REMITTANCE"
            asset="cash"
            sender={senderId}
            senderContact={contactDetails.sender}
            locationDetails={collectionDetails}
            transferInfo={transferDetails.sender}
          />
        );

      case 'CASH_COLLECTED':
        return (
          <ApproveERC20
            orderId={orderId}
            orderType="CROSS_BORDER_REMITTANCE"
            escrowDetails={escrowDetails}
            transferInfo={transferDetails.sender}
          />
        );

      default:
        return null;
    }
  }

  if (role.isRecipient) {
    switch (timelineStatus) {
      case 'RECIPIENT_ACCEPTED':
      case 'SENDER_AGENT_ACCEPTED':
        return (
          <AgentTakeOrder
            orderId={orderId}
            orderType="CROSS_BORDER_REMITTANCE"
            commission={fees.recipientAgent}
          />
        );

      case 'ESCROW_DEPOSITED':
        return (
          <AgentMeetup
            orderId={orderId}
            orderType="CROSS_BORDER_REMITTANCE"
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

  return <HeroNotFound />;
}
