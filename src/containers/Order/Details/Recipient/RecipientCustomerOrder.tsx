import { memo } from 'react';

import type { TransferTimelineStatus } from '@/src/schema/order/transfer-timeline';

import DeliverCash from '../-components/DeliverCash';
import RecipientCustomerTakeOrder from '../-components/TakeOrder/RecipientCustomerTakeOrder';

type Props = {
  status: TransferTimelineStatus;
};

export default memo(function RecipientOrder({ status }: Props) {
  switch (status) {
    case 'PENDING': {
      return <RecipientCustomerTakeOrder />;
    }

    case 'DELIVERY_MEETUP_SET':
      return <DeliverCash group="customer" />;

    default:
      return null;
  }
});
