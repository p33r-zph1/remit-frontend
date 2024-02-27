import HeroNotFound from '@/src/components/Hero/HeroNotFound';
import type { CrossBorderOrder } from '@/src/schema/order';

import ApproveERC20 from '../../-components/ApproveERC20';
import CollectCash from '../../-components/CollectCash';
import DeliverCash from '../../-components/DeliverCash';
import AgentMeetup from '../../-components/Meetup/AgentMeetup';
import RecipientAgentTakeOrder from '../../-components/TakeOrder/RecipientAgentTakeOrder';
import SenderAgentTakeOrder from '../../-components/TakeOrder/SenderAgentTakeOrder';

type Role = {
  isSender: boolean;
  isRecipient: boolean;
};

type Props = CrossBorderOrder & {
  role: Role;
};

export default function CrossBorderAgent({ role, ...orderProps }: Props) {
  const { transferTimelineStatus } = orderProps;

  if (role.isSender) {
    switch (transferTimelineStatus) {
      case 'RECIPIENT_ACCEPTED':
      case 'RECIPIENT_AGENT_ACCEPTED':
        return <SenderAgentTakeOrder />;
      case 'ORDER_ACCEPTED':
        return <AgentMeetup meetupType="collection" />;
      case 'COLLECTION_MEETUP_SET':
        return <CollectCash />;
      case 'CASH_COLLECTED':
        return <ApproveERC20 />;
      default:
        return null;
    }
  }

  if (role.isRecipient) {
    switch (transferTimelineStatus) {
      case 'RECIPIENT_ACCEPTED':
      case 'SENDER_AGENT_ACCEPTED':
        return <RecipientAgentTakeOrder />;
      case 'ESCROW_DEPOSITED': {
        return <AgentMeetup meetupType="delivery" />;
      }
      case 'DELIVERY_MEETUP_SET': {
        return <DeliverCash />;
      }
      default:
        return null;
    }
  }

  return <HeroNotFound />;
}
