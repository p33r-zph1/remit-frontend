import { memo } from 'react';

import type { LocalBuyOrder } from '@/src/schema/order';

type Props = LocalBuyOrder;

export default memo(function LocalBuyCustomer({
  transferTimelineStatus: timelineStatus,
}: Props) {
  switch (timelineStatus) {
    case 'COLLECTION_MEETUP_SET':
      return 'show the map + contact details';

    default:
      return null;
  }
});
