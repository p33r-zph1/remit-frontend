import { ArrowUpIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Status } from '../constants/types';
import { ArrowDownIcon } from '@heroicons/react/20/solid';

export function EmptyTransaction() {
  return (
    <div className="flex-1 flex justify-center items-center text-sleep-100 text-lg text-center px-8 py-16">
      <span>
        No transactions yet. Maybe it’s time to{' '}
        <a className="link text-primary decoration-black underline font-semibold">
          send
        </a>{' '}
        some money?
      </span>
    </div>
  );
}

export function TransactionIcon({ status }: { status: Status }) {
  switch (status) {
    default:
    case 'FAILED':
      return (
        <XMarkIcon className="w-12 h-12 bg-red-500 rounded-full p-3 text-white md:ml-16" />
      );
    case 'EXPIRED':
      return (
        <XMarkIcon className="w-12 h-12 bg-gray-500 rounded-full p-3 text-white md:ml-16" />
      );
    case 'IN_PROGRESS':
      return (
        <ArrowDownIcon className="w-12 h-12 bg-orange-500 rounded-full p-3 text-white md:ml-16" />
      );
    case 'SENT':
      return (
        <ArrowUpIcon className="w-12 h-12 bg-blue-500 rounded-full p-3 text-white md:ml-16" />
      );
  }
}

type Item = {
  recipient: string;
  status: Status;
  sentAmount: string;
  conversionAmount: string;
};

export function TransactionItem({
  recipient,
  status,
  sentAmount,
  conversionAmount,
}: Item) {
  return (
    <div className="flex flex-row justify-between items-center py-4 group mb-2">
      {/* Recipient & Status */}
      <div className="flex items-center justify-center space-x-3">
        <TransactionIcon status={status} />

        <div className="flex flex-col items-start justify-center">
          <div className="text-sm md:text-lg font-semibold max-w-sm">
            {recipient}
          </div>
          <div className="text-sm md:text-lg text-sleep-100 max-w-sm capitalize">
            {status.replace('_', ' ').toLowerCase()}
          </div>
        </div>
      </div>

      {/* Amount & Conversion Details */}
      <div className="flex flex-col items-end justify-center">
        <div className="text-sm md:text-lg font-bold max-w-sm transition group-hover:scale-105 duration-200">
          {sentAmount}
        </div>
        <div className="text-sm md:text-lg text-sleep-200">
          {conversionAmount}
        </div>
      </div>
    </div>
  );
}

export default function TransactionHistory() {
  return (
    <div className="flex-1 w-full flex flex-col px-6 py-2 sm:max-w-3xl sm:mx-auto">
      <h1 className="text-2xl font-semibold mt-14 mb-6 md:mb-12 md:text-3xl md:text-center">
        Transaction History
      </h1>

      {/* TODO: use component below  */}
      {/* <EmptyTransaction /> */}

      <TransactionItem
        recipient="1243455"
        status="SENT"
        sentAmount="12,497,549.47 SGD"
        conversionAmount="550,219.65 UA"
      />

      <TransactionItem
        recipient="1243455"
        status="IN_PROGRESS"
        sentAmount="12,497,549.47 SGD"
        conversionAmount="550,219.65 UA"
      />

      <TransactionItem
        recipient="1243455"
        status="FAILED"
        sentAmount="12,497,549.47 SGD"
        conversionAmount="550,219.65 UA"
      />

      <TransactionItem
        recipient="1243455"
        status="EXPIRED"
        sentAmount="12,497,549.47 SGD"
        conversionAmount="550,219.65 UA"
      />
    </div>
  );
}
