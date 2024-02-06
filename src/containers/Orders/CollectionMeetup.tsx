import { QrCodeIcon } from '@heroicons/react/20/solid';

import HeaderTitle from '../../components/HeaderTitle';
import { Group } from '../../schema/cognito';
import useOrderDetails from '../../hooks/useOrderDetails';
import CustomerMeetup from '../Meetup/CustomerMeetup';

type Props = {
  group: Group;
};

export default function CollectionMeetup({ group }: Props) {
  const {
    order: { collectionDetails, senderAgentId },
  } = useOrderDetails();

  if (!collectionDetails) throw new Error('Collection details is not present.');

  const { areaName } = collectionDetails;

  return (
    <>
      <HeaderTitle className="text-xl md:text-2xl">
        {group === 'customer' && <>Collect cash from Agent {senderAgentId}</>}
        {group === 'agent' && `Collect cash at ${areaName}`}
      </HeaderTitle>

      <div className="flex flex-col space-y-2">
        <button
          type="submit"
          className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
          // disabled={order.}
        >
          <QrCodeIcon className="h-6 w-6" />
          {group === 'customer' && 'Show QR'}
          {group === 'agent' && 'Scan QR'}
        </button>

        <button
          type="submit"
          className="btn btn-outline btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
          // disabled={order.}
        >
          Contact {group === 'customer' && 'agent'}
          {group === 'agent' && 'recipient'}
        </button>
      </div>

      <CustomerMeetup collectionDetails={collectionDetails} />
    </>
  );
}
