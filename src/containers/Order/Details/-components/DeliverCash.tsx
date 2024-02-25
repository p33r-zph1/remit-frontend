import { QrCodeIcon } from '@heroicons/react/20/solid';
import { useNavigate } from '@tanstack/react-router';
import { memo, useCallback, useState } from 'react';

import HeaderTitle from '@/src/components/HeaderTitle';
import Modal from '@/src/components/Modal';
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

  const [modalVisible, setModalVisible] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const onNavigateToScanQr = useCallback(() => {
    if (shouldNavigate) {
      navigate({
        to: '/order/$orderId/scanQr',
        mask: { to: '/order/$orderId' },
      });
    }
  }, [navigate, shouldNavigate]);

  if (!deliveryDetails) throw new Error('Delivery details is not present.');

  if (!recipientAgentId) throw new Error('Recipient agentId is not present.');

  if (!recipientAgent)
    throw new Error('Recipient agent contact details is not present.');

  return (
    <div className="flex flex-col space-y-4">
      <HeaderTitle className="text-xl md:text-2xl">
        Deliver cash to Recipient #{recipientId}
      </HeaderTitle>

      <div className="flex flex-col space-y-2">
        <button
          type="button"
          className="btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
          onClick={() => setModalVisible(true)}
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

      <Modal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        onCloseComplete={onNavigateToScanQr}
        type="action"
        actions={{
          confirm: {
            label: 'Yes',
            action: () => {
              setModalVisible(false);
              setShouldNavigate(true);
            },
          },
          cancel: {
            label: 'Cancel',
          },
        }}
        slideFrom="top"
        title="Scan QR"
        size="medium"
      >
        <p className="text-balance text-slate-500">
          Are you with the recipient right now?
        </p>
      </Modal>
    </div>
  );
});
