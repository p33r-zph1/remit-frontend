import { memo } from 'react';

import type { TransferTimelineStatus } from '@/src/schema/order/transfer-timeline';

import ApproveERC20 from '../-components/ApproveERC20';
import CollectCash from '../-components/CollectCash';
import AgentMeetup from '../-components/Meetup/AgentMeetup';
import SenderAgentTakeOrder from '../-components/TakeOrder/SenderAgentTakeOrder';

type Props = {
  status: TransferTimelineStatus;
};

export default memo(function SenderAgentOrder({ status }: Props) {
  switch (status) {
    case 'RECIPIENT_ACCEPTED':
    case 'RECIPIENT_AGENT_ACCEPTED':
      return <SenderAgentTakeOrder />;

    case 'ORDER_ACCEPTED':
      return <AgentMeetup meetupType="collection" />;

    case 'COLLECTION_MEETUP_SET':
      return <CollectCash />;

    case 'CASH_COLLECTED':
      return <ApproveERC20 />;

    default:
      return null;
  }
});
