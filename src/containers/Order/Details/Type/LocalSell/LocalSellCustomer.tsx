import { memo } from 'react';

import type { LocalSellOrder } from '@/src/schema/order';

import ApproveERC20 from '../../-components/ApproveERC20';
import ReceiveCash from '../../-components/ReceiveCash';

type Props = LocalSellOrder;

export default memo(function LocalSellCustomer({
  transferTimelineStatus: timelineStatus,
}: Props) {
  switch (timelineStatus) {
    case 'RECIPIENT_AGENT_ACCEPTED':
      return <ApproveERC20 />;

    case 'DELIVERY_MEETUP_SET':
      return <ReceiveCash />;

    default:
      return null;
  }
});
