import { Order } from '../../../schema/order';

import AcceptOrder from '../AcceptOrder';
import CollectionMeetup from '../CollectionMeetup';

type Props = Order;

export default function RecipientOrder({
  transferTimelineStatus: status,
  orderId,
  transferDetails,
  senderAgentId,
}: Props) {
  switch (status) {
    case 'PENDING': {
      return (
        <AcceptOrder
          orderId={orderId}
          countryIsoCode={transferDetails.recipient.countryIsoCode}
        />
      );
    }

    case 'COLLECTION_MEETUP_SET':
      return <CollectionMeetup senderAgentId={senderAgentId} />;

    default:
      return null;
  }
}
