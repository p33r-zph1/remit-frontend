import { Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import { numericFormatter } from 'react-number-format';

import StatusIcon from '../Icon/StatusIcon';
import type { OrderStatus } from '../../schema/order';

type Props = {
  status: OrderStatus;
  recipient: string;
  amount: string;
};

function getTitleByStatus(status: OrderStatus) {
  switch (status) {
    // case 'SENT':
    //   return (
    //     <div className="text-base  text-gray-400 md:text-lg">
    //       You are sending
    //     </div>
    //   );
    case 'IN_PROGRESS':
      return (
        <div className="text-base  text-gray-400 md:text-lg">
          Your transaction is in-progress
        </div>
      );
    case 'COMPLETED':
      return (
        <div className="text-base font-bold text-success md:text-lg">
          You sent
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

function BackButton() {
  return (
    <Link to="/" className="btn btn-circle btn-ghost -ml-3 mb-2 mt-6 sm:mt-16">
      <ArrowLeftIcon className="h-4 w-4 text-black md:h-6 md:w-6" />
    </Link>
  );
}

export default function TransferDetailsNav({
  status,
  recipient,
  amount,
}: Props) {
  return (
    <>
      <BackButton />

      <div className="flex flex-col space-y-4 py-1">
        {getTitleByStatus(status)}

        <div className="flex flex-row items-center justify-between py-1">
          <div className="max-w-sm text-balance text-2xl font-bold transition duration-200 hover:scale-105 sm:text-3xl md:text-4xl">
            {numericFormatter(amount, { thousandSeparator: ',' })}
          </div>
          <StatusIcon status={status} />
        </div>

        <div className="text-base text-sleep-200 md:text-lg">
          Recipient: {recipient}
        </div>
      </div>
    </>
  );
}
