import { Order } from '../../../schema/order';
import GiveCash from '../GiveCash';

type Props = Order;

export default function SenderOrder({
  transferTimelineStatus: status,
  senderAgentId,
}: Props) {
  switch (status) {
    case 'COLLECTION_MEETUP_SET':
      return <GiveCash senderAgentId={senderAgentId} />;

    default:
      return null;
  }
}
