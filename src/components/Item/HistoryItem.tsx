import { Link } from '@tanstack/react-router';

import type { Order } from '@/src/schema/order';
import { formatTranferInfo } from '@/src/schema/order/transfer-info';

import StatusIcon from '../Icon/StatusIcon';

type Item = Order & {
  isRecipient: boolean;
};

export default function HistoryItem({
  orderId,
  recipientId,
  orderStatus,
  transferDetails,
  isRecipient,
  transferTimelineStatus,
}: Item) {
  const { sender, recipient } = transferDetails;

  return (
    <Link
      to="/order/$orderId"
      params={{ orderId }}
      className="group mb-2 flex cursor-pointer flex-row items-center justify-between py-4 hover:bg-zinc-50"
    >
      {/* Recipient & Status */}
      <div className="flex items-center justify-center space-x-3">
        <StatusIcon status={orderStatus} isRecipient={isRecipient} />

        <div className="flex flex-col items-start justify-center">
          <div className="max-w-sm text-sm font-semibold md:text-lg">
            {recipientId}
          </div>
          <div className="max-w-sm text-sm capitalize text-gray-400 md:text-lg">
            {transferTimelineStatus.replace(/_/g, ' ').toLowerCase()}
          </div>
        </div>
      </div>

      {/* Amount & Conversion Details */}
      <div className="flex flex-col items-end justify-center">
        <div className="max-w-sm text-sm font-bold transition duration-200 group-hover:scale-105 md:text-lg">
          {formatTranferInfo(sender)}
        </div>
        <div className="text-sm text-gray-400 md:text-lg">
          {formatTranferInfo(recipient)}
        </div>
      </div>
    </Link>
  );
}
