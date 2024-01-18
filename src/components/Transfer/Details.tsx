import { Status } from '../../constants/types';
import TransactionIcon from '../Transaction/Icon';

type Props = {
  status: Status;
  recipient: string;
  amount: string;
};

function getTitleByStatus(status: Status) {
  switch (status) {
    case 'SENT':
      return (
        <div className="text-base  text-gray-400 md:text-lg">
          You are sending
        </div>
      );
    case 'IN_PROGRESS':
      return (
        <div className="text-base  text-gray-400 md:text-lg">
          Your transaction is in-progress
        </div>
      );
    case 'COMPLETE':
      return (
        <div className="text-base font-bold text-success md:text-lg">
          You sent
        </div>
      );
    case 'FAILED':
      return (
        <div className="text-base font-bold text-error md:text-lg">
          Failed to send
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

export default function TransferDetails({ status, recipient, amount }: Props) {
  return (
    <div className="flex flex-col space-y-4 py-1">
      {getTitleByStatus(status)}

      <div className="flex flex-row items-center justify-between py-1">
        <div className="max-w-sm text-2xl font-bold transition duration-200 hover:scale-105 sm:text-3xl md:text-4xl">
          {amount}
        </div>
        <TransactionIcon status={status} />
      </div>

      <div className="text-base text-sleep-200 md:text-lg">
        Recipient: {recipient}
      </div>
    </div>
  );
}
