import { Link } from '@tanstack/react-router';

import type { OrderStatus } from '@/src/schema/order';
import {
  formatTranferInfo,
  type TransferInfo,
} from '@/src/schema/order/transfer-info';
import type { TimelineStatus } from '@/src/schema/order/transfer-timeline';
import { safeFormatRelative } from '@/src/utils/date';

import StatusIcon from '../Icon/StatusIcon';

type Item = {
  orderId: string;
  orderStatus: OrderStatus;
  timelineStatus: TimelineStatus;
  transferInfo: TransferInfo;
  createdAt: Date;
  recipientId: string;
  isRecipient: boolean;
};

export default function OrderItem({
  orderId,
  orderStatus,
  timelineStatus,
  transferInfo,
  createdAt,
  recipientId,
  isRecipient,
}: Item) {
  return (
    <Link
      to="/order/$orderId"
      params={{ orderId }}
      className="group mb-2 flex cursor-pointer flex-row items-center justify-between text-balance rounded-lg py-4 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-4"
    >
      {/* Recipient & Status */}
      <div className="flex items-center justify-center space-x-3">
        <StatusIcon status={orderStatus} isRecipient={isRecipient} />

        <div className="flex flex-col items-start justify-center">
          <div className="text-sm font-semibold md:text-lg">{recipientId}</div>
          <div className="text-xs capitalize text-gray-500 md:text-lg">
            {timelineStatus.replace(/_/g, ' ').toLowerCase()}
          </div>
        </div>
      </div>

      {/* Amount & Conversion Details */}
      <div className="ml-2 flex flex-col items-end justify-center text-end">
        <div className="text-sm font-bold transition duration-200 group-hover:scale-105 md:text-lg">
          {formatTranferInfo(transferInfo)}
        </div>
        <div className="text-xs text-gray-400 first-letter:capitalize md:text-base">
          {safeFormatRelative(createdAt)}
        </div>
      </div>
    </Link>
  );
}
