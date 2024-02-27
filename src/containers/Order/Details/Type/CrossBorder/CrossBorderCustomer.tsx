import { memo } from 'react';

import HeroNotFound from '@/src/components/Hero/HeroNotFound';
import type { CrossBorderOrder } from '@/src/schema/order';

import GiveCash from '../../-components/GiveCash';
import ReceiveCash from '../../-components/ReceiveCash';
import RecipientCustomerTakeOrder from '../../-components/TakeOrder/RecipientCustomerTakeOrder';

type Role = {
  isSender: boolean;
  isRecipient: boolean;
};

type Props = CrossBorderOrder & {
  role: Role;
};

export default memo(function CrossBorderCustomer({
  role,
  ...orderProps
}: Props) {
  const { transferTimelineStatus } = orderProps;

  if (role.isSender) {
    switch (transferTimelineStatus) {
      case 'COLLECTION_MEETUP_SET':
        return <GiveCash />;

      default:
        return null;
    }
  }

  if (role.isRecipient) {
    switch (transferTimelineStatus) {
      case 'PENDING': {
        return <RecipientCustomerTakeOrder />;
      }

      case 'DELIVERY_MEETUP_SET':
        return <ReceiveCash />;

      default:
        return null;
    }
  }

  return <HeroNotFound />;
});
