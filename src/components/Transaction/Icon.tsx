import {
  XMarkIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
} from '@heroicons/react/20/solid';

import { Status } from '../../constants/types';

export default function TransactionIcon({ status }: { status: Status }) {
  switch (status) {
    case 'SENT':
      return (
        <ArrowUpIcon className="w-12 h-12 bg-primary rounded-full p-3 text-white shadow-md" />
      );
    case 'IN_PROGRESS':
      return (
        <ArrowDownIcon className="w-12 h-12 bg-accent rounded-full p-3 text-white shadow-md" />
      );
    case 'COMPLETE':
      return (
        <CheckIcon className="w-12 h-12 bg-success rounded-full p-3 text-white shadow-md" />
      );
    case 'FAILED':
      return (
        <XMarkIcon className="w-12 h-12 bg-error rounded-full p-3 text-white shadow-md" />
      );
    case 'EXPIRED':
      return (
        <XMarkIcon className="w-12 h-12 bg-base-300 rounded-full p-3 text-black shadow-md" />
      );
  }
}
