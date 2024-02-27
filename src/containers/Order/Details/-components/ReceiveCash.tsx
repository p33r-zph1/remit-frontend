import { ExclamationTriangleIcon, QrCodeIcon } from '@heroicons/react/20/solid';
import { useNavigate } from '@tanstack/react-router';
import { memo, useCallback, useState } from 'react';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import HeaderTitle from '@/src/components/HeaderTitle';
import Modal from '@/src/components/Modal';
import useGenerateQr from '@/src/hooks/api/useGenerateQr';
import useOrderDetails from '@/src/hooks/useOrderDetails';
import { Route } from '@/src/routes/_auth/order/$orderId';

import CustomerMeetup from './Meetup/CustomerMeetup';

export default memo(function ReceiveCash() {
  const navigate = useNavigate({ from: Route.fullPath });

  const { order } = useOrderDetails();

  const [modalVisible, setModalVisible] = useState(false);

  const {
    data: generatedQrData,
    mutateAsync: generateQrAsync,
    isPending: isGeneratingQr,
    isSuccess: isQrGenerated,
    error,
  } = useGenerateQr();

  const onNavigateToShowQr = useCallback(() => {
    if (isQrGenerated) {
      navigate({
        to: '/order/$orderId/showQr',
        search: { qrCode: generatedQrData.data.qrCode },
        mask: { to: '/order/$orderId' },
      });
    }
  }, [generatedQrData?.data.qrCode, isQrGenerated, navigate]);

  if (order.orderType !== 'CROSS_BORDER_REMITTANCE') return; // TODO: handle other `orderType`

  const {
    deliveryDetails,
    orderType,
    orderId,
    recipientAgentId,
    contactDetails: { recipientAgent },
  } = order;

  if (!deliveryDetails) throw new Error('Delivery details is not present.');

  if (!recipientAgentId) throw new Error('Recipient agentId is not present.');

  if (!recipientAgent)
    throw new Error('Recipient agent contact details is not present.');

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
          onClick={() => setModalVisible(true)}
          disabled={isGeneratingQr}
        >
          <QrCodeIcon className="h-6 w-6" />
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

      <Modal
        open={modalVisible}
        isLoading={isGeneratingQr}
        onClose={() => setModalVisible(false)}
        onCloseComplete={onNavigateToShowQr}
        type="action"
        actions={{
          confirm: {
            label: 'Proceed',
            action: () =>
              generateQrAsync({ orderType, orderId }).then(() =>
                setModalVisible(false)
              ),
          },
          cancel: {
            label: 'Cancel',
          },
        }}
        slideFrom="top"
        title="Show QR"
        size="medium"
      >
        <p className="text-balance text-slate-500">
          Are you sure you want to display your QR Code?
          <br />
          <br />
          <div
            role="alert"
            className="alert bg-white text-sm text-accent shadow-md"
          >
            <ExclamationTriangleIcon className="h-6 w-6" />

            <div>
              Reveal this QR Code{' '}
              <span className="font-bold">
                only to the assigned agent upon receiving your cash
              </span>{' '}
              to prevent loss of funds.
            </div>
          </div>
        </p>
      </Modal>
    </div>
  );
});
