import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import {
  addHours,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isPast,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  set,
  startOfHour,
  startOfWeek,
} from 'date-fns';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  value: Date | undefined;
  onChange: (date: Date) => void;
};

type Status =
  | 'SELECTED'
  | 'SELECTED_NOT_TODAY'
  | 'TODAY'
  | 'CURRENT_MONTH'
  | 'OTHER_MONTH';

const dayStatusBaseClasses =
  'mx-auto flex h-8 w-8 items-center justify-center rounded-full disabled:cursor-not-allowed transition-colors duration-200';

const dayStatusClasses: Record<Status, string> = {
  SELECTED: 'text-neutral-content bg-neutral/80 font-semibold hover:text-white',
  SELECTED_NOT_TODAY: 'text-white bg-primary/80 hover:bg-primary',
  TODAY: 'text-primary font-semibold hover:bg-gray-200',
  CURRENT_MONTH: 'text-gray-900 hover:bg-gray-200',
  OTHER_MONTH: 'text-gray-400 hover:bg-gray-200',
};

const colStartClasses: Record<number, string> = {
  0: '', // sunday
  1: 'col-start-2', // monday
  2: 'col-start-3', // tues, etc...
  3: 'col-start-4',
  4: 'col-start-5',
  5: 'col-start-6',
  6: 'col-start-7',
};

const getDayStatus = (
  day: Date,
  selectedDay: Date,
  firstDayCurrentMonth: Date
): Status => {
  if (isSameDay(day, selectedDay) && isToday(day)) return 'SELECTED';
  if (isSameDay(day, selectedDay)) return 'SELECTED_NOT_TODAY';
  if (isToday(day)) return 'TODAY';
  if (isSameMonth(day, firstDayCurrentMonth)) return 'CURRENT_MONTH';
  if (!isSameMonth(day, firstDayCurrentMonth)) return 'OTHER_MONTH';

  return 'OTHER_MONTH';
};

export default memo(function DateCalendar({ value, onChange }: Props) {
  const today = addHours(startOfHour(new Date()), 1);
  const day = value || today;

  const [selectedDay, setSelectedDay] = useState(day);

  const [currentMonth, setCurrentMonth] = useState(format(day, 'MMM-yyyy'));
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', day);

  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(firstDayCurrentMonth),
      end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    });
  }, [firstDayCurrentMonth]);

  const previousMonth = useCallback(() => {
    const firstDayPreviousMonth = addMonths(firstDayCurrentMonth, -1);
    setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'));
  }, [firstDayCurrentMonth]);

  const nextMonth = useCallback(() => {
    const firstDayNextMonth = addMonths(firstDayCurrentMonth, 1);
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }, [firstDayCurrentMonth]);

  const setToday = useCallback(() => {
    setSelectedDay(today);
    setCurrentMonth(format(today, 'MMM-yyyy'));
    onChange(today);
  }, [onChange, today]);

  useEffect(() => {
    setSelectedDay(day);
  }, [day]);

  return (
    <div className="mx-auto w-full max-w-sm">
      {/* Header */}
      <div className="flex items-center justify-stretch">
        <h2 className="flex-auto font-semibold">
          {format(firstDayCurrentMonth, 'MMMM yyyy')}
        </h2>

        <button
          type="button"
          onClick={previousMonth}
          className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={setToday}
          className="text-xs font-semibold text-gray-500 hover:text-gray-900"
        >
          today
        </button>

        <button
          onClick={nextMonth}
          type="button"
          className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Week */}
      <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>

      {/* Days grid */}
      <div className="mt-2 grid grid-cols-7 text-sm">
        {days.map((day, dayIdx) => {
          return (
            <div
              key={day.toString()}
              className={twMerge(
                dayIdx === 0 && colStartClasses[getDay(day)],
                'py-1.5'
              )}
            >
              <button
                type="button"
                disabled={isPast(day) && !isToday(day)}
                onClick={() => {
                  // Sets the same hour from today to selected day
                  const value = set(day, { hours: today.getHours() });

                  setSelectedDay(value);
                  onChange(value);
                }}
                className={twMerge(
                  dayStatusBaseClasses,
                  dayStatusClasses[
                    getDayStatus(day, selectedDay, firstDayCurrentMonth)
                  ]
                )}
              >
                <time dateTime={format(day, 'yyyy-MM-dd')}>
                  {format(day, 'd')}
                </time>
              </button>

              {isToday(day) && (
                <div className="mx-auto mt-1 h-1 w-1">
                  <div className="h-1 w-1 rounded-full bg-sky-500"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
