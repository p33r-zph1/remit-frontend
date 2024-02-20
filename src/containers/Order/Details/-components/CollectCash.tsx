import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { format } from 'date-fns';
import { memo, useState } from 'react';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import HeaderTitle from '@/src/components/HeaderTitle';
import Modal from '@/src/components/Modal';
import useConfirmCash from '@/src/hooks/api/useConfirmCash';
import useOrderDetails from '@/src/hooks/useOrderDetails';
import { formatTranferInfo } from '@/src/schema/order/transfer-info';

export default memo(function CollectCash() {
  const {
    order: {
      orderId,
      collectionDetails,
      transferDetails,
      contactDetails: { sender },
    },
  } = useOrderDetails();

  const { mutateAsync: collectCashAsync, isPending, error } = useConfirmCash();

  const [modalVisible, setModalVisible] = useState(false);

  if (!collectionDetails) throw new Error('Collection details is not present.');

  const { areaName, startDate } = collectionDetails;

  return (
    <div className="flex flex-col space-y-4">
      <HeaderTitle className="text-xl md:text-2xl">
        <span className="text-gray-400">Collect cash on </span>
        {format(startDate, 'MMMM dd, yyyy')}{' '}
        <span className="text-gray-400">at </span> {areaName}
      </HeaderTitle>

      {error && <ErrorAlert message={error.message} />}

      <div className="flex flex-col space-y-2">
        <button
          type="button"
          onClick={() => setModalVisible(true)}
          disabled={isPending}
          className="btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
        >
          <CurrencyDollarIcon className="h-6 w-6" />
          Cash collected
        </button>

        <button
          type="button"
          disabled={isPending}
          onClick={() => window.open(sender.telegram.url, '_blank')}
          className="btn btn-outline btn-primary btn-block rounded-full text-base font-semibold shadow-sm md:text-lg"
        >
          Contact sender
        </button>
      </div>

      <Modal
        open={modalVisible}
        isLoading={isPending}
        onClose={() => setModalVisible(false)}
        actions={{
          confirm: {
            label: 'Confirm',
            action: () => collectCashAsync({ orderId }),
          },
          cancel: {
            label: 'Cancel',
          },
        }}
        slideFrom="top"
        title="Confirm cash collection"
        size="medium"
      >
        <p className="text-balance text-slate-500">
          Have you collected{' '}
          <span className="font-bold">
            {formatTranferInfo(transferDetails.sender)}?
          </span>
        </p>
      </Modal>
    </div>
  );
});
