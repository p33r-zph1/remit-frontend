import { QrCodeIcon } from '@heroicons/react/20/solid';
import { useCallback } from 'react';

import { Group } from '../../schema/cognito';
import useOrderDetails from '../../hooks/useOrderDetails';
import useGenerateQr from '../../hooks/api/useGenerateQr';
import HeaderTitle from '../../components/HeaderTitle';
import CustomerMeetup from '../Meetup/CustomerMeetup';

type Props = {
  group: Group;
};

export default function CollectionMeetup({ group }: Props) {
  const {
    order: { collectionDetails, senderAgentId, orderId },
  } = useOrderDetails();

  if (!collectionDetails) throw new Error('Delivery details is not present.');

  const { areaName } = collectionDetails;

  const {
    mutateAsync: generateQrAsync,
    isPending: isGeneratingQr,
    data,
  } = useGenerateQr();

  console.log({ data });

  const handleQrClick = useCallback(async () => {
    if (group === 'customer') {
      return await generateQrAsync({ orderId });
    }
  }, [generateQrAsync, group, orderId]);

  return (
    <div className="flex flex-col space-y-12">
      <div>
        <HeaderTitle className="text-xl md:text-2xl">
          {group === 'customer' && <>Collect cash from Agent {senderAgentId}</>}
          {group === 'agent' && `Collect cash at ${areaName}`}
        </HeaderTitle>

        <div className="flex flex-col space-y-2">
          <button
            type="button"
            className="btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
            onClick={handleQrClick}
            disabled={isGeneratingQr}
          >
            <QrCodeIcon className="h-6 w-6" />
            {group === 'customer' && 'Show QR'}
            {group === 'agent' && 'Scan QR'}
          </button>

          <button
            type="button"
            className="btn btn-outline btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
            disabled={isGeneratingQr}
          >
            Contact {group === 'customer' && 'agent'}
            {group === 'agent' && 'recipient'}
          </button>
        </div>
      </div>

      {group === 'customer' && (
        <CustomerMeetup locationDetails={collectionDetails} />
      )}
    </div>
  );
}
