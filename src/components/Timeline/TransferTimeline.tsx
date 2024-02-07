import {
  XCircleIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/20/solid';

import type { OrderStatus, TransferTimeline } from '../../schema/order';

function getIconByStatus(status: OrderStatus, isLastItem: boolean = false) {
  if (status === 'IN_PROGRESS' && isLastItem) {
    return <ClockIcon className="h-6 w-6 text-gray-300" />;
  }

  switch (status) {
    case 'IN_PROGRESS':
      return <ClockIcon className="h-6 w-6 text-primary" />;
    case 'COMPLETED':
      return <CheckCircleIcon className="h-6 w-6 text-primary" />;
    case 'CANCELLED':
      return <XCircleIcon className="h-6 w-6 text-error/80" />;
    case 'EXPIRED':
      return <XCircleIcon className="h-6 w-6 text-gray-300" />;
  }
}

function getLineDividerByStatus(
  status: OrderStatus,
  isLastItem: boolean = false
) {
  if (status === 'IN_PROGRESS' && isLastItem) {
    return <hr className="bg-slate-300" />;
  }

  switch (status) {
    case 'IN_PROGRESS':
    case 'COMPLETED':
      return <hr className="bg-primary" />;
    case 'CANCELLED':
      return <hr className="bg-error/80" />;
    case 'EXPIRED':
      return <hr className="bg-slate-300" />;
  }
}

function Item({
  title,
  description,
  orderStatus,
  isLastItem,
}: TransferTimeline & { isLastItem: boolean }) {
  return (
    <li>
      {getLineDividerByStatus(orderStatus)}

      <div className="timeline-middle">{getIconByStatus(orderStatus)}</div>

      <div className="group timeline-end timeline-box">
        <div
          className="flex select-none flex-col items-baseline"
          // data-tip={getTooltipByStatus(orderStatus)}
        >
          <span className="text-xs font-semibold md:text-sm">{title}</span>

          <span className="text-xs duration-200 group-hover:text-sm md:text-sm md:group-hover:text-base">
            {description}
          </span>
        </div>
      </div>

      {!isLastItem && getLineDividerByStatus(orderStatus)}
    </li>
  );
}

type Props = {
  timeline: TransferTimeline[];
};

export default function TransferTimeline({ timeline }: Props) {
  return (
    <div>
      <div className="text-lg font-semibold md:text-xl">Transfer timeline</div>

      <ul className="timeline timeline-vertical timeline-compact">
        {timeline.map((item, index) => (
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
