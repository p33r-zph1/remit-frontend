import { type TransferTimelineStatus } from '../../../schema/order';

import AcceptOrder from '../AcceptOrder';
import DeliveryMeetup from '../DeliveryMeetup';

type Props = {
  status: TransferTimelineStatus;
};

export default function RecipientOrder({ status }: Props) {
  switch (status) {
    case 'PENDING': {
      return <AcceptOrder />;
    }

    case 'DELIVERY_MEETUP_SET':
      return <DeliveryMeetup group="customer" />;

    default:
      return null;
  }
}
