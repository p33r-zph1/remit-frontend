import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
} from '@heroicons/react/20/solid';
import { addHours, format, isBefore, setHours, startOfHour } from 'date-fns';
import { Dispatch, SetStateAction, useCallback, useMemo } from 'react';

type ContainerProps = {
  value: string;
  onUpClick: () => void;
  onDownClick: () => void;
  disableUp: boolean;
  disableDown: boolean;
};

function Container({
  value,
  onUpClick,
  onDownClick,
  disableUp,
  disableDown,
}: ContainerProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        onClick={onUpClick}
        disabled={disableUp}
        className="text-gray-400 hover:text-gray-500 disabled:hover:cursor-not-allowed"
      >
        <ChevronUpIcon className="h-5 w-5" />
      </button>

      <div className="rounded-box bg-neutral/80 px-3 py-1 text-neutral-content transition-colors duration-200 hover:text-white">
        <span className="select-none font-mono text-sm sm:text-lg">
          <span>{value}</span>
        </span>
      </div>

      <button
        onClick={onDownClick}
        disabled={disableDown}
        className="text-gray-400 hover:text-gray-500 disabled:hover:cursor-not-allowed"
      >
        <ChevronDownIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

type Props = {
  title?: string;
  value: Date | undefined;
  onChange: Dispatch<SetStateAction<Date>>;
  durationInHr: number;
  setDurationInHr: Dispatch<SetStateAction<number>>;
};

export default function DateTime({
  title,
  value,
  onChange,
  durationInHr,
  setDurationInHr,
}: Props) {
  const today = value || startOfHour(new Date());

  console.log({ today });

  const time = useMemo(() => format(today, 'hh'), [today]);
  const amPm = useMemo(() => format(today, 'aa'), [today]);

  const updateTime = useCallback(
    (hours: number) => onChange(prevDate => addHours(prevDate, hours)),
    [onChange]
  );

  const toggleAmPm = useCallback(() => {
    onChange(prevDate => {
      const hours = prevDate.getHours() >= 12 ? -12 : 12;
      return addHours(prevDate, hours);
    });
  }, [onChange]);

  const updateDuration = useCallback(
    (change: number) =>
      setDurationInHr(prevDuration => Math.max(1, prevDuration + change)),
    [setDurationInHr]
  );

  const disableTimeDecrement = useMemo(() => {
    const decrementedTime = addHours(today, -1);
    const currentHour = startOfHour(new Date());
    return isBefore(decrementedTime, currentHour);
  }, [today]);

  const disableDurationDecrement = useMemo(
    () => durationInHr === 1,
    [durationInHr]
  );

  const disableToggleAmPm = useMemo(() => {
    const currentHours = today.getHours();
    const toggledHours =
      currentHours >= 12 ? currentHours - 12 : currentHours + 12;
    const toggledDate = setHours(today, toggledHours);
    return isBefore(toggledDate, startOfHour(new Date()));
  }, [today]);

  return (
    <div className="flex items-center justify-evenly space-x-3">
      <div className="flex space-x-1">
        <ClockIcon className="h-5 w-5 text-neutral/80" />
        <span className="text-xs font-semibold text-neutral/80 sm:text-base">
          {title ? title : 'Select a time'}
        </span>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2">
        <Container
          value={time}
          onUpClick={() => updateTime(1)}
          onDownClick={() => updateTime(-1)}
          disableUp={false}
          disableDown={disableTimeDecrement}
        />

        <Container
          value={amPm}
          onUpClick={toggleAmPm}
          onDownClick={toggleAmPm}
          disableUp={disableToggleAmPm}
          disableDown={disableToggleAmPm}
        />

        <Container
          value={`${durationInHr}hr`}
          onUpClick={() => updateDuration(1)}
          onDownClick={() => updateDuration(-1)}
          disableUp={false}
          disableDown={disableDurationDecrement}
        />
      </div>
    </div>
  );
}
