import { memo } from 'react';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import Modal from '@/src/components/Modal';
import useOrderDetails from '@/src/hooks/useOrderDetails';
import useTakeOrder from '@/src/hooks/useTakeOrder';
import { formatCommissionDetails } from '@/src/schema/fees';

export default memo(function RecipientAgentTakeOrder() {
  const {
    order: { fees, orderId },
  } = useOrderDetails();

  const {
    // callbacks
    executeFn,
    onRecipientAgentAcceptOrder: onAcceptOrder,
    onRejectOrder,

    // state
    modalState,
    setModalState,
    isAccepting,
    isRejecting,

    // errors
    acceptOrderError,
    rejectOrderError,
  } = useTakeOrder({ orderId });

  if (!fees.recipientAgent)
    throw new Error('Recipient agent fees cannot be missing!');

  const { commission } = fees.recipientAgent;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <span className="text-gray-400">Your commission at {commission}%</span>

        <span className="text-xl font-bold md:text-2xl">
          {formatCommissionDetails(fees.recipientAgent)}
        </span>
      </div>

      {acceptOrderError && <ErrorAlert message={acceptOrderError.message} />}
      {rejectOrderError && <ErrorAlert message={rejectOrderError.message} />}

      <div className="flex flex-col space-y-2">
        <button
          type="button"
          onClick={onAcceptOrder}
          disabled={isAccepting || isRejecting}
          className="btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
        >
          Take order
        </button>

        <button
          type="button"
          onClick={onRejectOrder}
          disabled={isAccepting || isRejecting}
          className="btn btn-outline btn-error btn-block rounded-full text-base font-semibold shadow-sm md:text-lg"
        >
          Reject order
        </button>
      </div>

      <Modal
        open={modalState.visible}
        isLoading={isAccepting || isRejecting}
        onClose={() =>
          setModalState(prevState => ({ ...prevState, visible: false }))
        }
        actions={{
          confirm: {
            label: modalState.state || '?',
            action: () => executeFn?.(),
          },
          cancel: {
            label: 'Cancel',
          },
        }}
        slideFrom="top"
        title={`Confirm ${modalState.state} order`}
        size="medium"
      >
        <p className="text-balance text-slate-500">
          You&apos;re about to {modalState.state} an order with commission
          <br />
          <span className="font-bold">
            {formatCommissionDetails(fees.recipientAgent)} ({commission}%)
          </span>
          <br />
          <br />
          Are you sure you want to continue?
        </p>
      </Modal>
    </div>
  );
});
