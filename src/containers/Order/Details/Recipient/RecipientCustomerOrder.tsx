import { memo } from 'react';

import { type TransferTimelineStatus } from '@/src/schema/order';

import AcceptOrder from '../-components/AcceptOrder';
import DeliveryMeetup from '../-components/Meetup/DeliveryMeetup';

type Props = {
  status: TransferTimelineStatus;
};

export default memo(function RecipientOrder({ status }: Props) {
  switch (status) {
    case 'PENDING': {
      return <AcceptOrder />;
    }

    case 'DELIVERY_MEETUP_SET':
      return <DeliveryMeetup group="customer" />;

    default:
      return null;
  }
});
