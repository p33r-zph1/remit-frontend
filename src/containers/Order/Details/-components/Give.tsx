import { PhoneIcon } from '@heroicons/react/20/solid';
import { format } from 'date-fns';
import { memo } from 'react';

import HeaderTitle from '@/src/components/Header/HeaderTitle';
import type { Contact } from '@/src/schema/contact';
import type { LocationDetails } from '@/src/schema/location';

import CustomerMeetup from './Meetup/CustomerMeetup';

type Props = {
  asset: string;
  senderAgent: string | undefined;
  senderAgentContact: Contact | undefined;
  locationDetails: LocationDetails | undefined;
};

export default memo(function Give({
  asset,
  senderAgent,
  senderAgentContact,
  locationDetails,
}: Props) {
  if (!locationDetails) {
    throw new Error('Location details cannot be missing.');
  }

  if (!senderAgent || !senderAgentContact) {
    throw new Error('SenderAgent/Sender Agent details cannot be missing.');
  }

  const { areaName, startDate } = locationDetails;

  return (
    <div className="flex flex-col space-y-12">
      <div>
        <HeaderTitle className="text-xl md:text-2xl">
          {/* Give {asset} to Agent #{senderAgent} */}
          <span className="text-gray-400">Give {asset} to Agent </span>#
          {senderAgent}
          <span className="text-gray-400"> on </span>
          {format(startDate, 'MMMM dd, yyyy')}{' '}
          <span className="text-gray-400">at </span> {areaName}
        </HeaderTitle>

        <button
          type="button"
          onClick={() => window.open(senderAgentContact.telegram.url, '_blank')}
          className="btn btn-primary btn-block rounded-full text-base
font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
        >
          <PhoneIcon className="h-6 w-6" />
          Contact agent
        </button>
      </div>

      <CustomerMeetup locationDetails={locationDetails} />
    </div>
  );
});
