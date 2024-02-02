import {
  XCircleIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/20/solid';

import type { OrderStatus } from '../../schema/order';

export type Timeline = {
  title: string;
  description: string;
  status: OrderStatus;
};

type Props = {
  timeline: Timeline[];
};

function getIconByStatus(status: OrderStatus) {
  switch (status) {
    // case 'SENT':
    case 'IN_PROGRESS':
      return <ClockIcon className="h-6 w-6 text-gray-300" />;
    case 'COMPLETED':
      return <CheckCircleIcon className="h-6 w-6 text-primary" />;
    case 'CANCELLED':
      return <XCircleIcon className="h-6 w-6 text-error" />;
    case 'EXPIRED':
      return <XCircleIcon className="h-6 w-6 text-gray-300" />;
  }
}

function getLineDividerByStatus(status: OrderStatus) {
  switch (status) {
    // case 'SENT':
    case 'IN_PROGRESS':
      return <hr className="bg-slate-300" />;
    case 'COMPLETED':
      return <hr className="bg-primary" />;
    case 'CANCELLED':
      return <hr className="bg-error" />;
    case 'EXPIRED':
      return <hr className="bg-slate-300" />;
  }
}

function getTooltipByStatus(status: OrderStatus) {
  switch (status) {
    // case 'SENT':
    case 'IN_PROGRESS':
      return 'This step is still pending.';
    case 'COMPLETED':
      return 'This step has completed successfully.';
    case 'CANCELLED':
      return 'This step has been cancelled.';
    case 'EXPIRED':
      return 'This step has expired.';
  }
}

function Item({
  title,
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
          className="tooltip flex select-none flex-col items-baseline"
          data-tip={getTooltipByStatus(status)}
        >
          <span className="text-xs font-semibold md:text-sm">{title}</span>

          <span className="text-xs duration-200 group-hover:text-sm md:text-sm md:group-hover:text-base">
            {description}
          </span>
        </div>
      </div>

      {!isLastItem && getLineDividerByStatus(status)}
    </li>
  );
}

export default function TransferTimeline({ timeline }: Props) {
  return (
    <>
      <div className="mt-12 text-lg font-semibold md:mt-16 md:text-xl">
        Transfer timeline
      </div>

      <ul className="timeline timeline-vertical timeline-compact">
        {timeline.map((item, index) => (
          <Item
            key={item.title}
            {...item}
            isLastItem={index === timeline.length - 1}
          />
        ))}
      </ul>
    </>
  );
}
