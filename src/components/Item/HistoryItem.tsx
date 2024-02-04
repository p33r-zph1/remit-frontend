import { Link } from '@tanstack/react-router';
import { numericFormatter } from 'react-number-format';

import type { Order } from '../../schema/order';

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
}: Item) {
  const { sender, recipient } = transferDetails;

  return (
    <Link
      to="/transfer/$orderId"
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
          <div className="max-w-sm text-sm capitalize text-sleep-100 md:text-lg">
            {orderStatus.replace('_', ' ').toLowerCase()}
          </div>
        </div>
      </div>

      {/* Amount & Conversion Details */}
      <div className="flex flex-col items-end justify-center">
        <div className="max-w-sm text-sm font-bold transition duration-200 group-hover:scale-105 md:text-lg">
          {numericFormatter(`${sender.amount} ${sender.currency}`, {
            thousandSeparator: ',',
          })}
        </div>
        <div className="text-sm text-sleep-200 md:text-lg">
          {numericFormatter(`${recipient.amount} ${recipient.currency}`, {
            thousandSeparator: ',',
          })}
        </div>
      </div>
    </Link>
  );
}
