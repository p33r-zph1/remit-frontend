import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

import useCountdown from '@/src/hooks/useCountdown';

type Props = {
  endDate: Date;
  pendingLabel: string;
  completionLabel: string;
};

export default function CountdownCard({
  endDate,
  pendingLabel,
  completionLabel,
}: Props) {
  const { days, hours, minutes, seconds, isOver } = useCountdown({
    date: endDate,
  });

  return (
    <div
      className={twMerge(
        'flex flex-col items-stretch justify-center space-y-4 rounded-lg bg-gradient-to-b  px-4 py-8 text-primary-content shadow-md duration-200 md:p-8',
        Number(days) > 0
          ? 'from-deep-blue to-regal-blue hover:bg-deep-blue'
          : 'from-accent to-lemon-zest hover:bg-accent'
      )}
    >
      <div className="flex items-center space-x-1">
        <h1 className="text-xl font-bold tracking-wide md:text-3xl">
          {isOver ? completionLabel : pendingLabel}
        </h1>

        <span
          className="tooltip"
          data-tip="Please complete this transaction before it expires."
        >
          <InformationCircleIcon className="h-6 w-6" />
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex gap-5">
          <div>
            <span className="font-mono text-xl md:text-4xl">
              <span>{days}</span>
            </span>
            days
          </div>
          <div>
            <span className="font-mono text-xl md:text-4xl">
              <span>{hours}</span>
            </span>
            hours
          </div>
          <div>
            <span className="font-mono text-xl md:text-4xl">
              <span>{minutes}</span>
            </span>
            min
          </div>
          <div>
            <span className="font-mono text-xl md:text-4xl">
              <span>{seconds}</span>
            </span>
            sec
          </div>
        </div>
      </div>
    </div>
  );
}
