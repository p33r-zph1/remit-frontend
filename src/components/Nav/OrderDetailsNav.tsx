import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from '@tanstack/react-router';

import { type EscrowDetails, formatEscrowDetails } from '@/src/schema/escrow';
import type { OrderStatus } from '@/src/schema/order';
import { formatTranferInfo } from '@/src/schema/order/transfer-info';
import type { TimelineStatus } from '@/src/schema/order/transfer-timeline';

import StatusIcon from '../Icon/StatusIcon';

function getTitleByOrderStatus(status: OrderStatus) {
  switch (status) {
    case 'IN_PROGRESS':
      return (
        <div className="text-base text-gray-400 md:text-lg">
          Transaction is in progress
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

function getDescription(timelineStatus: TimelineStatus, label: string) {
  switch (timelineStatus) {
    case 'RECIPIENT_REJECTED':
    case 'RECIPIENT_AGENT_REJECTED':
    case 'SENDER_AGENT_REJECTED':
      return <p className="text-accent">{label}</p>;

    case 'ORDER_EXPIRED':
      return <p className="text-error">{label}</p>;

    case 'ESCROW_RELEASED':
      return <p className="text-success">{label}</p>;

    default:
      return <p>{label}</p>;
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
  orderStatus: OrderStatus;
  timelineStatus: TimelineStatus;
  orderDetails: Parameters<typeof formatTranferInfo>[0] | EscrowDetails;
  label: string;
  isRecipientCustomer: boolean;
};

export default function OrderDetailsNav({
  label,
  orderStatus,
  orderDetails,
  timelineStatus,
  isRecipientCustomer,
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
          {getDescription(timelineStatus, label)}
        </div>
      </div>
    </div>
  );
}
