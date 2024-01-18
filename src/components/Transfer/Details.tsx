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
        <div className="text-gray-400  text-base md:text-lg">
          You are sending
        </div>
      );
    case 'IN_PROGRESS':
      return (
        <div className="text-gray-400  text-base md:text-lg">
          Your transaction is in-progress
        </div>
      );
    case 'COMPLETE':
      return (
        <div className="text-success font-bold text-base md:text-lg">
          You sent
        </div>
      );
    case 'FAILED':
      return (
        <div className="text-error font-bold text-base md:text-lg">
          Failed to send
        </div>
      );
    case 'EXPIRED':
      return (
        <div className="text-gray-400 font-bold text-base md:text-lg">
          Transaction expired
        </div>
      );
  }
}

export default function TransferDetails({ status, recipient, amount }: Props) {
  return (
    <div className="flex flex-col space-y-4 py-1">
      {getTitleByStatus(status)}

      <div className="flex flex-row justify-between items-center py-1">
        <div className="text-2xl font-bold max-w-sm sm:text-3xl md:text-4xl transition hover:scale-105 duration-200">
          {amount}
        </div>
        <TransactionIcon status={status} />
      </div>

      <div className="text-sleep-200 text-base md:text-lg">
        Recipient: {recipient}
      </div>
    </div>
  );
}
