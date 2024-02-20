import { memo } from 'react';

import type { TransferTimelineStatus } from '@/src/schema/order/transfer-timeline';

import DeliverCash from '../-components/DeliverCash';
import AgentMeetup from '../-components/Meetup/AgentMeetup';
import RecipientAgentTakeOrder from '../-components/TakeOrder/RecipientAgentTakeOrder';

type Props = {
  status: TransferTimelineStatus;
};

export default memo(function RecipientAgentOrder({ status }: Props) {
  switch (status) {
    case 'RECIPIENT_ACCEPTED':
    case 'SENDER_AGENT_ACCEPTED':
      return <RecipientAgentTakeOrder />;

    case 'ESCROW_DEPOSITED': {
      return <AgentMeetup meetupType="delivery" />;
    }

    case 'DELIVERY_MEETUP_SET': {
      return <DeliverCash />;
    }

    default:
      break;
  }
});
