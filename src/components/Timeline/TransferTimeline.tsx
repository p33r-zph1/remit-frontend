import {
  ArrowPathIcon,
  BoltIcon,
  CheckCircleIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  UserCircleIcon,
  WalletIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

import type {
  Timeline,
  TimelineStatus,
} from '@/src/schema/order/transfer-timeline';
import { safeFormatRelative } from '@/src/utils/date';

function getIconByStatus(timelineStatus: TimelineStatus) {
  switch (timelineStatus) {
    case 'PENDING':
      return <CurrencyDollarIcon className="h-6 w-6 text-primary" />;

    case 'RECIPIENT_ACCEPTED':
    case 'SENDER_AGENT_ACCEPTED':
    case 'RECIPIENT_AGENT_ACCEPTED':
      return <UserCircleIcon className="h-6 w-6 text-primary" />;

    case 'ORDER_ACCEPTED':
      return <BoltIcon className="h-6 w-6 text-primary" />;

    case 'COLLECTION_MEETUP_SET':
    case 'DELIVERY_MEETUP_SET':
    case 'SENDER_ARRIVED':
      return <MapPinIcon className="h-6 w-6 text-primary" />;

    case 'ESCROW_DEPOSITED':
      return <ArrowPathIcon className="h-6 w-6 text-primary" />;

    case 'CASH_COLLECTED':
    case 'CASH_DELIVERED':
      return <WalletIcon className="h-6 w-6 text-primary" />;

    case 'ESCROW_RELEASED':
      return <CheckCircleIcon className="h-6 w-6 text-primary" />;

    case 'RECIPIENT_REJECTED':
    case 'SENDER_AGENT_REJECTED':
    case 'RECIPIENT_AGENT_REJECTED':
    case 'ORDER_EXPIRED':
      return <XCircleIcon className="h-6 w-6 text-error/80" />;
  }
}

function getLineDividerByStatus(timelineStatus: TimelineStatus) {
  switch (timelineStatus) {
    case 'PENDING':
    case 'RECIPIENT_ACCEPTED':
    case 'SENDER_AGENT_ACCEPTED':
    case 'RECIPIENT_AGENT_ACCEPTED':
    case 'ORDER_ACCEPTED':
    case 'COLLECTION_MEETUP_SET':
    case 'DELIVERY_MEETUP_SET':
    case 'SENDER_ARRIVED':
    case 'ESCROW_DEPOSITED':
    case 'CASH_COLLECTED':
    case 'CASH_DELIVERED':
    case 'ESCROW_RELEASED':
      return <hr className="bg-primary/80" />;

    case 'RECIPIENT_REJECTED':
    case 'SENDER_AGENT_REJECTED':
    case 'RECIPIENT_AGENT_REJECTED':
    case 'ORDER_EXPIRED':
      return <hr className="bg-error/80" />;
  }
}

function Item({
  dateTime,
  description,
  status,
  isLastItem,
}: Timeline & { isLastItem: boolean }) {
  return (
    <li>
      {getLineDividerByStatus(status)}

      <div className="timeline-middle">{getIconByStatus(status)}</div>

      <div className="group timeline-end timeline-box">
        <div
          className="flex select-none flex-col items-baseline"
          // data-tip={getTooltipByStatus(status)}
        >
          <span className="text-xs font-semibold first-letter:capitalize md:text-sm">
            {safeFormatRelative(dateTime)}
          </span>

          <span className="text-xs duration-200 group-hover:text-sm md:text-sm md:group-hover:text-base">
            {description}
          </span>
        </div>
      </div>

      {!isLastItem && getLineDividerByStatus(status)}
    </li>
  );
}

type Props = {
  timeline: Timeline[];
};

export default function TransferTimeline({ timeline }: Props) {
  return (
    <div>
      <div className="text-lg font-semibold md:text-xl">Transfer timeline</div>

      <ul className="timeline timeline-vertical timeline-compact">
        {timeline
          .slice()
          .sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime())
          .map((item, index) => (
            <Item
              key={item.description}
              {...item}
              isLastItem={index === timeline.length - 1}
            />
          ))}
      </ul>
    </div>
  );
}
