import {
  XMarkIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
} from '@heroicons/react/20/solid';

import { Status } from '../../constants/types';

export default function StatusIcon({ status }: { status: Status }) {
  switch (status) {
    case 'SENT':
      return (
        <ArrowUpIcon className="h-12 w-12 rounded-full bg-primary p-3 text-white shadow-md" />
      );
    case 'IN_PROGRESS':
      return (
        <ArrowDownIcon className="h-12 w-12 rounded-full bg-accent p-3 text-white shadow-md" />
      );
    case 'COMPLETE':
      return (
        <CheckIcon className="h-12 w-12 rounded-full bg-success p-3 text-white shadow-md" />
      );
    case 'FAILED':
      return (
        <XMarkIcon className="h-12 w-12 rounded-full bg-error p-3 text-white shadow-md" />
      );
    case 'EXPIRED':
      return (
        <XMarkIcon className="h-12 w-12 rounded-full bg-base-300 p-3 text-black shadow-md" />
      );
  }
}
