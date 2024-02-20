import { QrCodeIcon } from '@heroicons/react/20/solid';
import { useNavigate } from '@tanstack/react-router';
import { memo, useCallback } from 'react';

import HeaderTitle from '@/src/components/HeaderTitle';
import useOrderDetails from '@/src/hooks/useOrderDetails';
import { Route } from '@/src/routes/_auth/order/$orderId';

import CustomerMeetup from './Meetup/CustomerMeetup';

export default memo(function DeliverCash() {
  const navigate = useNavigate({ from: Route.fullPath });

  const {
    order: {
      deliveryDetails,
      recipientAgentId,
      recipientId,
      contactDetails: { recipientAgent, recipient },
    },
  } = useOrderDetails();

  if (!deliveryDetails) throw new Error('Delivery details is not present.');

  if (!recipientAgentId) throw new Error('Recipient agentId is not present.');

  if (!recipientAgent)
    throw new Error('Recipient agent contact details is not present.');

  const handleScanQr = useCallback(async () => {
    return navigate({
      to: '/order/$orderId/scanQr',
      mask: { to: '/order/$orderId' },
    });
  }, [navigate]);

  return (
    <div className="flex flex-col space-y-4">
      <HeaderTitle className="text-xl md:text-2xl">
        Deliver cash to Recipient #{recipientId}
      </HeaderTitle>

      <div className="flex flex-col space-y-2">
        <button
          type="button"
          className="btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
          onClick={handleScanQr}
          disabled={false}
        >
          <QrCodeIcon className="h-6 w-6" />
          Scan QR
        </button>

        <button
          type="button"
          disabled={false}
          onClick={() => window.open(recipient.telegram.url, '_blank')}
          className="btn btn-outline btn-primary btn-block rounded-full text-base font-semibold shadow-sm md:text-lg"
        >
          Contact recipient
        </button>
      </div>

      <CustomerMeetup locationDetails={deliveryDetails} />
    </div>
  );
});
