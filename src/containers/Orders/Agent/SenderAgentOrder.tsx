import { type TransferTimelineStatus } from '@/src/schema/order';

import AgentMeetup from '../../Meetup/AgentMeetup';
import ApproveERC20 from '../ApproveERC20';
import CollectCash from '../CollectCash';
import TakeOrder from '../TakeOrder';

type Props = {
  status: TransferTimelineStatus;
};

export default function SenderAgentOrder({ status }: Props) {
  switch (status) {
    case 'RECIPIENT_ACCEPTED':
    case 'RECIPIENT_AGENT_ACCEPTED':
      return <TakeOrder />;

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
