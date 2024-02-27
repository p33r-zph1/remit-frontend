import HeroNotFound from '@/src/components/Hero/HeroNotFound';
import type { CrossBorderOrder } from '@/src/schema/order';

import ApproveERC20 from '../../-components/ApproveERC20';
import CollectCash from '../../-components/CollectCash';
import DeliverCash from '../../-components/DeliverCash';
import AgentMeetup from '../../-components/Meetup/AgentMeetup';
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
  const { transferTimelineStatus: timelineStatus } = orderProps;

  if (role.isSender) {
    switch (timelineStatus) {
      case 'RECIPIENT_ACCEPTED':
      case 'RECIPIENT_AGENT_ACCEPTED':
        return <AgentWithFormTakeOrder />;

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
    switch (timelineStatus) {
      case 'RECIPIENT_ACCEPTED':
      case 'SENDER_AGENT_ACCEPTED':
        return <AgentTakeOrder />;

      case 'ESCROW_DEPOSITED':
        return <AgentMeetup meetupType="delivery" />;

      case 'DELIVERY_MEETUP_SET':
        return <DeliverCash />;

      default:
        return null;
    }
  }

  return <HeroNotFound />;
}
