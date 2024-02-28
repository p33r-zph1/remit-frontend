import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from '@tanstack/react-router';

import { type EscrowDetails, formatEscrowDetails } from '@/src/schema/escrow';
import type { OrderStatus } from '@/src/schema/order';
import {
  formatTranferInfo,
  type TransferInfo,
} from '@/src/schema/order/transfer-info';
import type { TimelineStatus } from '@/src/schema/order/transfer-timeline';

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
        <div className="text-base font-bold text-accent md:text-lg">
          Transaction cancelled
        </div>
      );
    case 'EXPIRED':
      return (
        <div className="text-base font-bold text-error md:text-lg">
          Transaction expired
        </div>
      );
  }
}

function getRecipientDescription(timelineStatus: TimelineStatus) {
  switch (timelineStatus) {
    case 'PENDING':
      return <p>Is the estimated amount to receive</p>;

    case 'RECIPIENT_REJECTED':
    case 'RECIPIENT_AGENT_REJECTED':
    case 'SENDER_AGENT_REJECTED':
      return <p className="text-accent">This order has been rejected</p>;

    case 'ORDER_EXPIRED':
      return <p className="text-error">This order has expired</p>;

    case 'CASH_COLLECTED':
      return <p>Cash has been collected</p>;

    case 'CASH_DELIVERED':
      return <p>Cash has been delivered</p>;

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

type Props = {
  isRecipientCustomer: boolean;
  orderStatus: OrderStatus;
  timelineStatus: TimelineStatus;
  orderDetails: TransferInfo | EscrowDetails;
};

export default function OrderDetailsNav({
  orderStatus,
  isRecipientCustomer,
  orderDetails,
  timelineStatus,
}: Props) {
  return (
    <div>
      <BackButton />

      <div className="flex flex-col space-y-4 py-1">
        {getTitleByOrderStatus(orderStatus)}

        <div className="flex flex-row items-center justify-between py-1">
          <div className="max-w-sm text-balance text-2xl font-bold transition duration-200 hover:scale-105 sm:text-3xl md:text-4xl">
            {'token' in orderDetails
              ? formatEscrowDetails(orderDetails)
              : formatTranferInfo(orderDetails)}
          </div>

          <StatusIcon status={orderStatus} isRecipient={isRecipientCustomer} />
        </div>

        <div className="text-base text-gray-400 md:text-lg">
          {getRecipientDescription(timelineStatus)}
        </div>
      </div>
    </div>
  );
}
