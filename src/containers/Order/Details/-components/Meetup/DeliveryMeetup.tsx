import { QrCodeIcon } from '@heroicons/react/20/solid';
import { useNavigate } from '@tanstack/react-router';
import { useCallback } from 'react';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import HeaderTitle from '@/src/components/HeaderTitle';
import CustomerMeetup from '@/src/containers/Meetup/CustomerMeetup';
import useGenerateQr from '@/src/hooks/api/useGenerateQr';
import useOrderDetails from '@/src/hooks/useOrderDetails';
import { Route } from '@/src/routes/_auth/order/$orderId';
import type { Group } from '@/src/schema/cognito';

type Props = {
  group: Group;
};

export default function DeliveryMeetup({ group }: Props) {
  const navigate = useNavigate({ from: Route.fullPath });

  const {
    order: {
      deliveryDetails,
      recipientAgentId,
      orderId,
      contactDetails: { recipientAgent, recipient },
    },
  } = useOrderDetails();

  if (!deliveryDetails) throw new Error('Delivery details is not present.');

  if (!recipientAgentId) throw new Error('Recipient agentId is not present.');

  if (!recipientAgent)
    throw new Error('Recipient agent contact details is not present.');

  const { areaName } = deliveryDetails;

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
        to: '/order/$orderId/showQr',
        search: { qrCode },
        mask: { to: '/order/$orderId' },
      });
    }
    if (group === 'agent') {
      return navigate({
        to: '/order/$orderId/scanQr',
        mask: { to: '/order/$orderId' },
      });
    }
  }, [generateQrAsync, group, navigate, orderId]);

  return (
    <div className="flex flex-col space-y-4">
      <HeaderTitle className="text-xl md:text-2xl">
        {group === 'customer' && (
          <>Collect cash from Agent #{recipientAgentId}</>
        )}
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
          disabled={isGeneratingQr}
          onClick={() => {
            switch (group) {
              case 'customer': {
                return window.open(recipientAgent.telegram.url, '_blank');
              }
              case 'agent': {
                return window.open(recipient.telegram.url, '_blank');
              }
            }
          }}
          className="btn btn-outline btn-primary btn-block rounded-full text-base font-semibold shadow-sm md:text-lg"
        >
          Contact {group === 'customer' && 'agent'}
          {group === 'agent' && 'recipient'}
        </button>
      </div>

      {group === 'customer' && (
        <CustomerMeetup locationDetails={deliveryDetails} />
      )}
    </div>
  );
}
