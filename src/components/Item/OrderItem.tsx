import { Link } from '@tanstack/react-router';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

import { type EscrowDetails } from '@/src/schema/escrow';
import type { OrderStatus } from '@/src/schema/order';
import { type TransferInfo } from '@/src/schema/order/transfer-info';
import type { TimelineStatus } from '@/src/schema/order/transfer-timeline';
import { formatNumber } from '@/src/utils';
import { safeFormatDistance } from '@/src/utils/date';

import StatusIcon from '../Icon/StatusIcon';

type Item = {
  orderId: string;
  orderStatus: OrderStatus;
  timelineStatus: TimelineStatus;
  orderDetails: (TransferInfo & { isComputed: boolean }) | EscrowDetails;
  createdAt: Date;
  recipientId: string;
  isRecipient: boolean;
  disabled: boolean;
};

export default memo(function OrderItem({
  orderId,
  orderStatus,
  timelineStatus,
  orderDetails,
  createdAt,
  recipientId,
  isRecipient,
  disabled,
}: Item) {
  return (
    <Link
      to="/order/$orderId"
      params={{ orderId }}
      className={twMerge(
        'group mb-2 flex cursor-pointer flex-row items-center justify-between text-balance rounded-lg py-4 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-4',
        disabled && 'cursor-wait opacity-50'
      )}
      disabled={disabled}
    >
      {/* Recipient & Status */}
      <div className="flex items-center justify-center space-x-3">
        <StatusIcon status={orderStatus} isRecipient={isRecipient} />

        <div className="flex flex-col items-start justify-center">
          <div className="text-sm font-semibold md:text-lg">{recipientId}</div>
          <div className="text-xs capitalize text-gray-500 md:text-base">
            {timelineStatus.replace(/_/g, ' ').toLowerCase()}
          </div>
        </div>
      </div>

      {/* Amount & Conversion Details */}
      <div className="ml-2 flex flex-col items-end justify-center text-end">
        <div className="flex text-sm font-bold transition duration-200 group-hover:scale-105 md:text-lg">
          <div className="mr-1 inline-block max-w-20 truncate sm:max-w-full">
            {'token' in orderDetails
              ? formatNumber(orderDetails.amountMinusFees)
              : formatNumber(
                  orderDetails.isComputed
                    ? orderDetails.amountMinusFees
                    : orderDetails.amount
                )}
          </div>

          {'token' in orderDetails ? orderDetails.token : orderDetails.currency}
        </div>

        <div className="text-xs text-gray-400 first-letter:capitalize md:text-base">
          {safeFormatDistance(createdAt)} ago
        </div>
      </div>
    </Link>
  );
});
