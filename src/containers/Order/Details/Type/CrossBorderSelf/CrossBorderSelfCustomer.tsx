import { memo } from 'react';

import type { CrossBorderSelfOrder } from '@/src/schema/order';

import Give from '../../-components/Give';
import ReceiveWithQr from '../../-components/ReceiveWithQr';

export default memo(function CrossBorderSelfCustomer(
  props: CrossBorderSelfOrder
) {
  const {
    transferTimelineStatus: timelineStatus,
    orderId,
    senderAgentId,
    recipientAgentId,
    contactDetails,
    collectionDetails,
    deliveryDetails,
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

    case 'DELIVERY_MEETUP_SET':
      return (
        <ReceiveWithQr
          orderId={orderId}
          orderType="CROSS_BORDER_SELF_REMITTANCE"
          asset="cash"
          agent={recipientAgentId}
          agentContact={contactDetails.recipientAgent}
          locationDetails={deliveryDetails}
        />
      );

    default:
      return null;
  }
});
