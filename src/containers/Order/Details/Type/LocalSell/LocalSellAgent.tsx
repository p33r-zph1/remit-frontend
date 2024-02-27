import type { LocalSellOrder } from '@/src/schema/order';

import DeliverCash from '../../-components/DeliverCash';
import AgentMeetup from '../../-components/Meetup/AgentMeetup';
import AgentTakeOrder from '../../-components/TakeOrder/AgentTakeOrder';

type Props = LocalSellOrder;

export default function LocalSellAgent(props: Props) {
  const { transferTimelineStatus: timelineStatus } = props;

  switch (timelineStatus) {
    case 'PENDING':
      return <AgentTakeOrder />;

    case 'ESCROW_DEPOSITED':
      return <AgentMeetup meetupType="delivery" />;

    case 'DELIVERY_MEETUP_SET':
      return <DeliverCash />;

    default:
      return null;
  }
}
