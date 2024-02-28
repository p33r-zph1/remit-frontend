import type { LocalBuyOrder } from '@/src/schema/order';

import Give from '../../-components/Give';

type Props = LocalBuyOrder;

export default function LocalBuyCustomer(props: Props) {
  const {
    transferTimelineStatus: timelineStatus,
    senderAgentId,
    contactDetails,
    collectionDetails,
  } = props;

  switch (timelineStatus) {
    case 'COLLECTION_MEETUP_SET':
      return (
        <Give
          asset="cash"
          senderAgent={senderAgentId}
          senderAgentContact={contactDetails.senderAgent}
          locationDetails={collectionDetails}
        />
      );

    default:
      return null;
  }
}
