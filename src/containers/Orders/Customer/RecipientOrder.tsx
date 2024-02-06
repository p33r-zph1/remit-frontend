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

    case 'DELIVERY_MEETUP_SET':
      return (
        <CollectionMeetup group="customer" senderAgentId={senderAgentId} />
      );

    default:
      return null;
  }
}
