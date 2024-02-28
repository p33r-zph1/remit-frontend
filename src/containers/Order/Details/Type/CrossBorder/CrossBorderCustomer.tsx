import { memo } from 'react';

import HeroNotFound from '@/src/components/Hero/HeroNotFound';
import type { CrossBorderOrder } from '@/src/schema/order';

import Give from '../../-components/Give';
import ReceiveWithQr from '../../-components/ReceiveWithQr';
import RecipientCustomerTakeOrder from '../../-components/TakeOrder/RecipientCustomerTakeOrder';

type Role = {
  isSender: boolean;
  isRecipient: boolean;
};

type Props = CrossBorderOrder & {
  role: Role;
};

export default memo(function CrossBorderCustomer({
  role,
  ...orderProps
}: Props) {
  const {
    transferTimelineStatus: timelineStatus,
    orderId,
    senderAgentId,
    recipientAgentId,
    contactDetails,
    collectionDetails,
    deliveryDetails,
    transferDetails,
  } = orderProps;

  if (role.isSender) {
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

  if (role.isRecipient) {
    switch (timelineStatus) {
      case 'PENDING':
        return (
          <RecipientCustomerTakeOrder
            orderId={orderId}
            orderType="CROSS_BORDER_REMITTANCE"
            transferInfo={transferDetails.recipient}
          />
        );

      case 'DELIVERY_MEETUP_SET':
        return (
          <ReceiveWithQr
            orderId={orderId}
            orderType="CROSS_BORDER_REMITTANCE"
            asset="cash"
            agent={recipientAgentId}
            agentContact={contactDetails.recipientAgent}
            locationDetails={deliveryDetails}
          />
        );

      default:
        return null;
    }
  }

  return <HeroNotFound />;
});
