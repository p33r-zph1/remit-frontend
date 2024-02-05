import { Fragment, useEffect, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { CalendarIcon } from '@heroicons/react/20/solid';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import { addHours, format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

import DateCalendar from '../Date/DateCalendar';
import DateTime from '../Date/DateTime';

type Props<T extends FieldValues> = UseControllerProps<T> & {
  setEndDate: (date: Date) => void;
};

export default function CalendarPopover<T extends FieldValues>({
  setEndDate,
  ...controllerProps
}: Props<T>) {
  const {
    field: { name, onBlur, onChange, ref, value, disabled },
  } = useController(controllerProps);

  const [durationInHr, setDurationInHr] = useState(1); // 1 hour

  // Calculate end date based on duration
  const endDate = addHours(value, durationInHr);

  useEffect(() => {
    if (endDate) setEndDate(endDate);
  }, [endDate, setEndDate]);

  return (
    <Popover className="my-1">
      {({ open }) => (
        <>
          <Popover.Button
            className={twMerge(
              'flex w-full flex-row space-x-2 rounded-md border border-slate-200 p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary md:text-base'
            )}
            name={name}
            onBlur={onBlur}
            ref={ref}
            disabled={disabled}
          >
            <CalendarIcon
              className={twMerge(
                open ? 'text-black' : 'text-black/70',
                'h-5 w-5'
              )}
              aria-hidden="true"
            />

            <span className="font-semibold">
              {value ? (
                <Fragment>
                  {format(value, 'MMMM dd, yyyy')}
                  {` `}
                  <span className="tracking-tighter">
                    {format(value, 'h:mm a')}
                    {' - '}
                    {format(endDate, 'h:mm a')}{' '}
                    <small className="text-gray-400">{`(${durationInHr}hr)`}</small>
                  </span>
                </Fragment>
              ) : (
                'Please select a date'
              )}
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
            <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform rounded-md bg-zinc-50 lg:max-w-md">
              <div className="overflow-hidden rounded-lg p-4 shadow-lg ring-1 ring-black/5">
                <DateCalendar value={value} onChange={onChange} />

                {value && (
                  <Fragment>
                    <div className="divider" />

                    <DateTime
                      title="Time & Duration"
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
