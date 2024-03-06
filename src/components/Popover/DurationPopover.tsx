import { Popover, Transition } from '@headlessui/react';
import { CalendarIcon } from '@heroicons/react/20/solid';
import { addHours } from 'date-fns';
import { Fragment, useEffect, useMemo, useState } from 'react';
import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import { safeFormatRelativeDistance } from '@/src/utils/date';

import DateCalendar from '../Date/DateCalendar';
import DateTime from '../Date/DateTime';

type Props<T extends FieldValues> = UseControllerProps<T> & {
  setEndDate: (date: Date) => void;
};

export default function DurationPopover<T extends FieldValues>({
  setEndDate,
  ...controllerProps
}: Props<T>) {
  const {
    field: { value, onChange, disabled, ...otherFields },
    formState: { isSubmitting },
    fieldState: { error },
  } = useController(controllerProps);

  const startDate = z.coerce.date().nullish().parse(value);

  const [durationInHr, setDurationInHr] = useState(1); // 1 hour

  // Calculate end date based on duration
  const endDate = useMemo(() => {
    if (!startDate) return;

    return addHours(startDate, durationInHr);
  }, [durationInHr, startDate]);

  useEffect(() => {
    if (endDate) {
      setEndDate(endDate);
    }
  }, [endDate, setEndDate]);

  return (
    <Popover className="my-1">
      {({ open: _open }) => (
        <>
          <Popover.Button
            className={twMerge(
              'flex w-full flex-row space-x-2 rounded-md p-2 text-sm focus:outline-none disabled:text-slate-400 disabled:hover:cursor-not-allowed md:text-base',
              error
                ? 'ring-1 ring-error'
                : 'ring-1 ring-slate-200 focus:ring-primary'
            )}
            {...otherFields}
            disabled={isSubmitting || disabled}
          >
            <CalendarIcon
              className={twMerge('h-5 w-5', error && 'text-error')}
              aria-hidden="true"
            />

            <span
              className={twMerge(
                'font-semibold first-letter:uppercase',
                error && 'text-error'
              )}
            >
              {startDate
                ? safeFormatRelativeDistance(startDate, endDate)
                : 'Please select a date'}
            </span>
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-30 mt-3 w-screen max-w-sm -translate-x-1/2 transform rounded-md bg-zinc-50 lg:max-w-md">
              <div className="overflow-hidden rounded-lg p-4 shadow-lg ring-1 ring-black/5">
                <DateCalendar value={value} onChange={onChange} />

                {value && (
                  <Fragment>
                    <div className="divider" />

                    <DateTime
                      value={value}
                      onChange={onChange}
                      durationInHr={durationInHr}
                      setDurationInHr={setDurationInHr}
                    />
                  </Fragment>
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
