import { QrCodeIcon } from '@heroicons/react/20/solid';
import { useNavigate } from '@tanstack/react-router';
import { memo, useCallback } from 'react';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import HeaderTitle from '@/src/components/HeaderTitle';
import useGenerateQr from '@/src/hooks/api/useGenerateQr';
import useOrderDetails from '@/src/hooks/useOrderDetails';
import { Route } from '@/src/routes/_auth/order/$orderId';

import CustomerMeetup from './Meetup/CustomerMeetup';

export default memo(function ReceiveCash() {
  const navigate = useNavigate({ from: Route.fullPath });

  const {
    order: {
      deliveryDetails,
      recipientAgentId,
      orderId,
      contactDetails: { recipientAgent },
    },
  } = useOrderDetails();

  if (!deliveryDetails) throw new Error('Delivery details is not present.');

  if (!recipientAgentId) throw new Error('Recipient agentId is not present.');

  if (!recipientAgent)
    throw new Error('Recipient agent contact details is not present.');

  const {
    mutateAsync: generateQrAsync,
    isPending: isGeneratingQr,
    error,
  } = useGenerateQr();

  const handleShowQr = useCallback(async () => {
    const {
      data: { qrCode },
    } = await generateQrAsync({ orderId });

    return navigate({
      to: '/order/$orderId/showQr',
      search: { qrCode },
      mask: { to: '/order/$orderId' },
    });
  }, [generateQrAsync, navigate, orderId]);

  return (
    <div className="flex flex-col space-y-4">
      <HeaderTitle className="text-xl md:text-2xl">
        Collect cash from Agent #{recipientAgentId}
      </HeaderTitle>

      {error && <ErrorAlert message={error.message} />}

      <div className="flex flex-col space-y-2">
        <button
          type="button"
          className="btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
          onClick={handleShowQr}
          disabled={isGeneratingQr}
        >
          {isGeneratingQr ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <QrCodeIcon className="h-6 w-6" />
          )}
          Show QR
        </button>

        <button
          type="button"
          disabled={isGeneratingQr}
          onClick={() => window.open(recipientAgent.telegram.url, '_blank')}
          className="btn btn-outline btn-primary btn-block rounded-full text-base font-semibold shadow-sm md:text-lg"
        >
          Contact agent
        </button>
      </div>

      <CustomerMeetup locationDetails={deliveryDetails} />
    </div>
  );
});
