import { Status } from '../../constants/types';
import TransactionIcon from './Icon';

type Item = {
  recipient: string;
  status: Status;
  sentAmount: string;
  conversionAmount: string;
};

export default function TransactionItem({
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
