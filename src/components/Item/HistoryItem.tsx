import { Link } from '@tanstack/react-router';
import type { OrderStatus } from '../../schema/order';

import StatusIcon from '../Icon/StatusIcon';
import { numericFormatter } from 'react-number-format';

type Item = {
  orderId: string;
  recipient: string;
  status: OrderStatus;
  sentAmount: string;
  conversionAmount: string;
};

export default function HistoryItem({
  orderId,
  recipient,
  status,
  sentAmount,
  conversionAmount,
}: Item) {
  return (
    <Link
      to="/transfer/$orderId"
      params={{ orderId }}
      className="group mb-2 flex cursor-pointer flex-row items-center justify-between py-4 hover:bg-zinc-50"
    >
      {/* Recipient & Status */}
      <div className="flex items-center justify-center space-x-3">
        <StatusIcon status={status} />

        <div className="flex flex-col items-start justify-center">
          <div className="max-w-sm text-sm font-semibold md:text-lg">
            {recipient}
          </div>
          <div className="max-w-sm text-sm capitalize text-sleep-100 md:text-lg">
            {status.replace('_', ' ').toLowerCase()}
          </div>
        </div>
      </div>

      {/* Amount & Conversion Details */}
      <div className="flex flex-col items-end justify-center">
        <div className="max-w-sm text-sm font-bold transition duration-200 group-hover:scale-105 md:text-lg">
          {numericFormatter(sentAmount, { thousandSeparator: ',' })}
        </div>
        <div className="text-sm text-sleep-200 md:text-lg">
          {numericFormatter(conversionAmount, { thousandSeparator: ',' })}
        </div>
      </div>
    </Link>
  );
}
