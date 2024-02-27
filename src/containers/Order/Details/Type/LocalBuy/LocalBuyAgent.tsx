import type { LocalBuyOrder } from '@/src/schema/order';

type Props = LocalBuyOrder;

export default function LocalBuyAgent(props: Props) {
  const { transferTimelineStatus: timelineStatus } = props;

  switch (timelineStatus) {
    case 'PENDING':
      return 'accept/reject take order';

    case 'SENDER_AGENT_ACCEPTED':
      return 'deposit stable coins';

    case 'ESCROW_DEPOSITED':
      return 'set colllection (map) meetup';

    case 'COLLECTION_MEETUP_SET':
      return 'show the map + confirm cash collected';

    default:
      return null;
  }
}
