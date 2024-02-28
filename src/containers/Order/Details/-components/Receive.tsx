import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { format } from 'date-fns';
import { memo, useState } from 'react';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import HeaderTitle from '@/src/components/HeaderTitle';
import Modal from '@/src/components/Modal';
import useConfirmCash from '@/src/hooks/api/useConfirmCash';
import { type Contact } from '@/src/schema/contact';
import type { LocationDetails } from '@/src/schema/location';
import { type OrderType } from '@/src/schema/order';
import {
  formatTranferInfo,
  type TransferInfo,
} from '@/src/schema/order/transfer-info';

type Props = {
  orderType: OrderType;
  orderId: string;
  asset: string;
  sender: string | undefined;
  senderContact: Contact | undefined;
  locationDetails: LocationDetails | undefined;
  transferInfo: TransferInfo | undefined;
};

export default memo(function Receive({
  orderType,
  orderId,
  asset,
  sender,
  senderContact,
  locationDetails,
  transferInfo,
}: Props) {
  const { mutateAsync: collectCashAsync, isPending, error } = useConfirmCash();

  const [modalVisible, setModalVisible] = useState(false);

  if (!sender || !senderContact) {
    throw new Error('Sender/Sender details cannot be missing.');
  }

  if (!locationDetails) {
    throw new Error('Location details cannot be missing.');
  }

  if (!transferInfo) {
    throw new Error('Transfer info cannot be missing.');
  }

  const { areaName, startDate } = locationDetails;

  return (
    <div className="flex flex-col space-y-4">
      <HeaderTitle className="text-xl md:text-2xl">
        <span className="text-gray-400">Collect {asset} on </span>
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
          onClick={() => window.open(senderContact.telegram.url, '_blank')}
          className="btn btn-outline btn-primary btn-block rounded-full text-base font-semibold shadow-sm md:text-lg"
        >
          Contact sender
        </button>
      </div>

      <Modal
        open={modalVisible}
        isLoading={isPending}
        onClose={() => setModalVisible(false)}
        type="action"
        actions={{
          confirm: {
            label: 'Confirm',
            action: () => collectCashAsync({ orderType, orderId }),
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
          <span className="font-bold">{formatTranferInfo(transferInfo)}?</span>
          <br />
          <br />
          <span className="text-xs font-semibold text-accent">
            Warning: This action cannot be undone.
          </span>
        </p>
      </Modal>
    </div>
  );
});
