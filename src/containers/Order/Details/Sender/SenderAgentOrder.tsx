import { memo } from 'react';

import AgentMeetup from '@/src/containers/Meetup/AgentMeetup';
import { type TransferTimelineStatus } from '@/src/schema/order';

import ApproveERC20 from '../-components/ApproveERC20';
import CollectionMeetup from '../-components/Meetup/CollectionMeetup';
import TakeOrder from '../-components/TakeOrder';

type Props = {
  status: TransferTimelineStatus;
};

export default memo(function SenderAgentOrder({ status }: Props) {
  switch (status) {
    case 'RECIPIENT_ACCEPTED':
    case 'RECIPIENT_AGENT_ACCEPTED':
      return <TakeOrder />;

    case 'ORDER_ACCEPTED':
      return <AgentMeetup meetupType="collection" />;

    case 'COLLECTION_MEETUP_SET':
      return <CollectionMeetup />;

    case 'CASH_COLLECTED':
      return <ApproveERC20 />;

    default:
      return null;
  }
});
