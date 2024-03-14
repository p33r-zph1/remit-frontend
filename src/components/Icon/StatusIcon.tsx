import {
  ArrowDownIcon,
  ArrowUpIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';

import type { OrderStatus } from '@/src/schema/order';

type Props = {
  status: OrderStatus;
  isRecipient: boolean;
};

export default function StatusIcon({ status, isRecipient }: Props) {
  switch (status) {
    case 'IN_PROGRESS': {
      if (isRecipient)
        return (
          <ArrowDownIcon className="h-12 w-12 rounded-full bg-primary p-3 text-white shadow-md" />
        );

      return (
        <ArrowUpIcon className="h-12 w-12 rounded-full bg-primary p-3 text-white shadow-md" />
      );
    }

    case 'COMPLETED':
      return (
        <CheckIcon className="h-12 w-12 rounded-full bg-success p-3 text-white shadow-md" />
      );
    case 'CANCELLED':
      return (
        <XMarkIcon className="h-12 w-12 rounded-full bg-accent p-3 text-white shadow-md" />
      );
    case 'EXPIRED':
      return (
        <XMarkIcon className="h-12 w-12 rounded-full bg-error p-3 text-white shadow-md" />
      );
  }
}
