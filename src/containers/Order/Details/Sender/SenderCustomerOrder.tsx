import { memo } from 'react';

import type { TransferTimelineStatus } from '@/src/schema/order/transfer-timeline';

import GiveCash from '../-components/GiveCash';

type Props = {
  status: TransferTimelineStatus;
};

export default memo(function SenderOrder({ status }: Props) {
  switch (status) {
    case 'COLLECTION_MEETUP_SET':
      return <GiveCash />;

    case 'ORDER_EXPIRED':
    default:
      return null;
  }
});
