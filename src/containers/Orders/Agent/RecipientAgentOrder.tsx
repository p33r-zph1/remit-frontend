import { type TransferTimelineStatus } from '../../../schema/order';
import AgentMeetup from '../../Meetup/AgentMeetup';
import CollectionMeetup from '../CollectionMeetup';
import TakeOrder from '../TakeOrder';

type Props = {
  status: TransferTimelineStatus;
};

export default function RecipientAgentOrder({ status }: Props) {
  switch (status) {
    case 'RECIPIENT_ACCEPTED':
    case 'SENDER_AGENT_ACCEPTED':
      return <TakeOrder />;

    case 'ESCROW_DEPOSITED': {
      return <AgentMeetup meetupType="delivery" />;
    }

    case 'DELIVERY_MEETUP_SET': {
      return <CollectionMeetup group="agent" />;
    }

    default:
      break;
  }
}
