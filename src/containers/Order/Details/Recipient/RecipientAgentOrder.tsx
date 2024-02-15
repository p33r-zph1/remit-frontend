import { memo } from 'react';

import AgentMeetup from '@/src/containers/Meetup/AgentMeetup';
import { type TransferTimelineStatus } from '@/src/schema/order';

import DeliveryMeetup from '../-components/Meetup/DeliveryMeetup';
import TakeOrder from '../-components/TakeOrder';

type Props = {
  status: TransferTimelineStatus;
};

export default memo(function RecipientAgentOrder({ status }: Props) {
  switch (status) {
    case 'RECIPIENT_ACCEPTED':
    case 'SENDER_AGENT_ACCEPTED':
      return <TakeOrder />;

    case 'ESCROW_DEPOSITED': {
      return <AgentMeetup meetupType="delivery" />;
    }

    case 'DELIVERY_MEETUP_SET': {
      return <DeliveryMeetup group="agent" />;
    }

    default:
      break;
  }
});
