import {
  XMarkIcon,
  ArrowDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/20/solid';

import { Status } from '../../constants/types';

export default function TransactionIcon({ status }: { status: Status }) {
  switch (status) {
    default:
    case 'FAILED':
      return (
        <XMarkIcon className="w-12 h-12 bg-red-500 rounded-full p-3 text-white" />
      );
    case 'EXPIRED':
      return (
        <XMarkIcon className="w-12 h-12 bg-gray-500 rounded-full p-3 text-white" />
      );
    case 'IN_PROGRESS':
      return (
        <ArrowDownIcon className="w-12 h-12 bg-orange-500 rounded-full p-3 text-white" />
      );
    case 'SENT':
      return (
        <ArrowUpIcon className="w-12 h-12 bg-blue-500 rounded-full p-3 text-white" />
      );
  }
}
