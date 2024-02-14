import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from '@tanstack/react-router';
import { numericFormatter } from 'react-number-format';

import type { Order, OrderStatus, TransferInfo } from '../../schema/order';
import StatusIcon from '../Icon/StatusIcon';

function getTitleByStatus(status: OrderStatus) {
  switch (status) {
    case 'IN_PROGRESS':
      return (
        <div className="text-base text-gray-400 md:text-lg">
          Transaction is in-progress
        </div>
      );
    case 'COMPLETED':
      return (
        <div className="text-base font-bold text-success md:text-lg">
          Transaction complete
        </div>
      );
    case 'CANCELLED':
      return (
        <div className="text-base font-bold text-error md:text-lg">
          Transaction cancelled
        </div>
      );
    case 'EXPIRED':
      return (
        <div className="text-base font-bold text-gray-400 md:text-lg">
          Transaction expired
        </div>
      );
  }
}

function getAmount({ amount, currency }: TransferInfo) {
  return numericFormatter(`${amount} ${currency}`, {
    thousandSeparator: ',',
  });
}

function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.history.back()}
      className="btn btn-circle btn-ghost -ml-3 mb-2 mt-6 sm:mt-16"
    >
      <ArrowLeftIcon className="h-4 w-4 text-black md:h-6 md:w-6" />
    </button>
  );
}

type Props = Order & {
  isRecipient: boolean;
};

export default function OrderDetailsNav({
  orderStatus,
  isRecipient,
  recipientId,
  senderId,
  transferDetails,
}: Props) {
  const { sender, recipient } = transferDetails;

  return (
    <div>
      <BackButton />

      <div className="flex flex-col space-y-4 py-1">
        {isRecipient ? (
          <div className="text-base font-bold text-gray-400 md:text-lg">
            Sender {senderId} sent
          </div>
        ) : (
          getTitleByStatus(orderStatus)
        )}

        <div className="flex flex-row items-center justify-between py-1">
          <div className="max-w-sm text-balance text-2xl font-bold transition duration-200 hover:scale-105 sm:text-3xl md:text-4xl">
            {isRecipient ? getAmount(recipient) : getAmount(sender)}
          </div>

          <StatusIcon status={orderStatus} isRecipient={isRecipient} />
        </div>

        <div className="text-base text-sleep-200 md:text-lg">
          {isRecipient
            ? 'Is the exact amount to receive'
            : `Recipient ${recipientId}`}
        </div>
      </div>
    </div>
  );
}
