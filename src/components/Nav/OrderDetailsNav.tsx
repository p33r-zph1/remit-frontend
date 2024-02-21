import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from '@tanstack/react-router';

import type { Order, OrderStatus } from '@/src/schema/order';
import { formatTranferInfo } from '@/src/schema/order/transfer-info';
import type { TransferTimelineStatus } from '@/src/schema/order/transfer-timeline';

import StatusIcon from '../Icon/StatusIcon';

function getTitleByOrderStatus(status: OrderStatus) {
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

function getRecipientDescription(status: TransferTimelineStatus) {
  switch (status) {
    case 'PENDING':
      return <p>Is the estimated amount to receive</p>;

    case 'RECIPIENT_REJECTED':
    case 'RECIPIENT_AGENT_REJECTED':
    case 'SENDER_AGENT_REJECTED':
      return <p className="text-error">This order has been rejected</p>;

    case 'ORDER_EXPIRED':
      return <p className="text-error">This order has expired</p>;

    case 'CASH_COLLECTED':
      return <p>Cash has been collected by senderagent</p>;

    case 'CASH_DELIVERED':
      return <p>Cash gas been delivererd by recipientagent</p>;

    case 'ESCROW_RELEASED':
      return <p className="text-success">Order is completed</p>;

    default:
      return <p>Is the exact amount to receive</p>;
  }
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
  transferTimelineStatus,
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
          getTitleByOrderStatus(orderStatus)
        )}

        <div className="flex flex-row items-center justify-between py-1">
          <div className="max-w-sm text-balance text-2xl font-bold transition duration-200 hover:scale-105 sm:text-3xl md:text-4xl">
            {isRecipient
              ? formatTranferInfo(recipient)
              : formatTranferInfo(sender)}
          </div>

          <StatusIcon status={orderStatus} isRecipient={isRecipient} />
        </div>

        <div className="text-base text-gray-400 md:text-lg">
          {isRecipient
            ? getRecipientDescription(transferTimelineStatus)
            : `Recipient ${recipientId}`}
        </div>
      </div>
    </div>
  );
}
