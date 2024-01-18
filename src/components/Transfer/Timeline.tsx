import {
  XCircleIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/20/solid';

import { Status } from '../../constants/types';

export type Timeline = {
  title: string;
  description: string;
  status: Status;
};

type Props = {
  timeline: Timeline[];
};

function getIconByStatus(status: Status) {
  switch (status) {
    case 'SENT':
    case 'IN_PROGRESS':
      return <ClockIcon className="h-6 w-6 text-gray-300" />;
    case 'COMPLETE':
      return <CheckCircleIcon className="h-6 w-6 text-primary" />;
    case 'FAILED':
      return <XCircleIcon className="h-6 w-6 text-error" />;
    case 'EXPIRED':
      return <XCircleIcon className="h-6 w-6 text-gray-300" />;
  }
}

function getLineDividerByStatus(status: Status) {
  switch (status) {
    case 'SENT':
    case 'IN_PROGRESS':
      return <hr className="bg-slate-300" />;
    case 'COMPLETE':
      return <hr className="bg-primary" />;
    case 'FAILED':
      return <hr className="bg-error" />;
    case 'EXPIRED':
      return <hr className="bg-slate-300" />;
  }
}

function getTooltipByStatus(status: Status) {
  switch (status) {
    case 'SENT':
    case 'IN_PROGRESS':
      return 'This step is still pending.';
    case 'COMPLETE':
      return 'This step has completed successfully.';
    case 'FAILED':
      return 'This step has failed.';
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
