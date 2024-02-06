import { TransferTimelineStatus } from '../../../schema/order';

import TakeOrder from '../TakeOrder';
import CollectCash from '../CollectCash';
import SendERC20 from '../SendERC20';
import SetCollectionMeetup from '../SetCollectionMeetup';

type Props = {
  status: TransferTimelineStatus;
};

export default function SenderAgentOrder({ status }: Props) {
  switch (status) {
    case 'RECIPIENT_ACCEPTED':
    case 'RECIPIENT_AGENT_ACCEPTED':
      return <TakeOrder />;

    case 'ORDER_ACCEPTED':
      return <SetCollectionMeetup meetupType="collection" />;

    case 'COLLECTION_MEETUP_SET':
      return <CollectCash meetupType="collection" />;

    case 'CASH_COLLECTED':
      return <SendERC20 />;

    default:
      return null;
  }
}
