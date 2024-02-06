import { Order } from '../../../schema/order';
import CollectionMeetup from '../CollectionMeetup';
import SetCollectionMeetup from '../SetCollectionMeetup';
import TakeOrder from '../TakeOrder';

type Props = Order;

export default function RecipientAgentOrder({
  transferTimelineStatus: status,
  orderId,
  fees,
  collectionDetails,
}: Props) {
  switch (status) {
    case 'SENDER_AGENT_ACCEPTED':
      return (
        <TakeOrder
          orderId={orderId}
          recipientAgentCommission={fees.recipientAgentCommission || 'N/A'}
        />
      );

    case 'ESCROW_DEPOSITED': {
      return <SetCollectionMeetup orderId={orderId} />;
    }

    case 'DELIVERY_MEETUP_SET': {
      if (!collectionDetails)
        throw new Error('Collection details is not present.');

      const { areaName } = collectionDetails;

      return (
        <CollectionMeetup
          key="agent"
          collectionMessage={`Collect cash at ${areaName}`}
        />
      );
    }

    default:
      break;
  }
}
