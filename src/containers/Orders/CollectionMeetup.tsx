import { QrCodeIcon } from '@heroicons/react/20/solid';
import { useCallback } from 'react';

import type { Group } from '../../schema/cognito';
import useOrderDetails from '../../hooks/useOrderDetails';
import useGenerateQr from '../../hooks/api/useGenerateQr';
import HeaderTitle from '../../components/HeaderTitle';
import CustomerMeetup from '../Meetup/CustomerMeetup';
import ErrorAlert from '../../components/Alert/ErrorAlert';
import { useNavigate } from '@tanstack/react-router';

type Props = {
  group: Group;
};

export default function CollectionMeetup({ group }: Props) {
  const navigate = useNavigate();

  const {
    order: { collectionDetails, senderAgentId, orderId },
  } = useOrderDetails();

  if (!collectionDetails) throw new Error('Delivery details is not present.');

  const { areaName } = collectionDetails;

  const {
    mutateAsync: generateQrAsync,
    isPending: isGeneratingQr,
    error,
  } = useGenerateQr();

  const handleQrClick = useCallback(async () => {
    if (group === 'customer') {
      const {
        data: { qrCode },
      } = await generateQrAsync({ orderId });

      return navigate({
        to: '/order/$orderId',
        params: { orderId },
        search: { qrCode },
        mask: { to: '/order/$orderId', params: { orderId } },
      });
    }
    if (group === 'agent') {
      return navigate({
        to: '/order/scanQr',
      });
    }
  }, [generateQrAsync, group, navigate, orderId]);

  return (
    <div className="flex flex-col space-y-4">
      <HeaderTitle className="text-xl md:text-2xl">
        {group === 'customer' && <>Collect cash from Agent #{senderAgentId}</>}
        {group === 'agent' && `Collect cash at ${areaName}`}
      </HeaderTitle>

      {error && <ErrorAlert message={error.message} />}

      <div className="flex flex-col space-y-2">
        <button
          type="button"
          className="btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
          onClick={handleQrClick}
          disabled={isGeneratingQr}
        >
          {isGeneratingQr ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <QrCodeIcon className="h-6 w-6" />
          )}
          {group === 'customer' && 'Show QR'}
          {group === 'agent' && 'Scan QR'}
        </button>

        <button
          type="button"
          className="btn btn-outline btn-primary btn-block rounded-full text-base font-semibold shadow-sm md:text-lg"
          disabled={isGeneratingQr}
        >
          Contact {group === 'customer' && 'agent'}
          {group === 'agent' && 'recipient'}
        </button>
      </div>

      {group === 'customer' && (
        <CustomerMeetup locationDetails={collectionDetails} />
      )}
    </div>
  );
}
