import { PhoneIcon } from '@heroicons/react/20/solid';
import { memo } from 'react';

import HeaderTitle from '@/src/components/HeaderTitle';
import useOrderDetails from '@/src/hooks/useOrderDetails';

import CustomerMeetup from './Meetup/CustomerMeetup';

export default memo(function GiveCash() {
  const { order } = useOrderDetails();

  if (order.orderType !== 'CROSS_BORDER_REMITTANCE') return; // TODO: handle other `orderType`

  const {
    senderAgentId,
    collectionDetails,
    contactDetails: { senderAgent },
  } = order;

  if (!collectionDetails) throw new Error('Collection details is not present.');

  if (!senderAgent)
    throw new Error('Sender agent contact details is not present.');

  return (
    <div className="flex flex-col space-y-12">
      <div>
        <HeaderTitle className="text-xl md:text-2xl">
          Give cash to Agent #{senderAgentId}
        </HeaderTitle>

        <button
          type="button"
          onClick={() => window.open(senderAgent.telegram.url, '_blank')}
          className="btn btn-primary btn-block rounded-full text-base
font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
        >
          <PhoneIcon className="h-6 w-6" />
          Contact agent
        </button>
      </div>

      <CustomerMeetup locationDetails={collectionDetails} />
    </div>
  );
});
