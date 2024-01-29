import { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { CalendarIcon } from '@heroicons/react/20/solid';
import { addHours, format, startOfHour } from 'date-fns';

import { cx } from '../../utils';
import DateCalendar from '../Date/DateCalendar';
import DateTime from '../Date/DateTime';

export default function CalendarPopover() {
  const [startDate, setStartDate] = useState(startOfHour(new Date()));
  const [durationInHr, setDurationInHr] = useState(1); // 1 hour

  // Calculate end date based on duration
  const endDate = addHours(startDate, durationInHr);

  return (
    <div className="my-2">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={cx(
                'flex w-full flex-row space-x-2 rounded-md border border-slate-200 px-1 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary md:text-base'
              )}
            >
              <CalendarIcon
                className={cx(open ? 'text-black' : 'text-black/70', 'h-5 w-5')}
                aria-hidden="true"
              />

              <span className="font-semibold">
                {format(startDate, 'MMMM dd, yyyy')}
                {` `}
                <span className="tracking-tighter">
                  {format(startDate, 'h:mm a')}
                  {' - '}
                  {format(endDate, 'h:mm a')}{' '}
                  <small className="text-gray-400">{`(${durationInHr}hr)`}</small>
                </span>
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
                  <DateCalendar today={startDate} onChange={setStartDate} />

                  <div className="divider" />

                  <DateTime
                    title="Time & Duration"
                    today={startDate}
                    onChange={setStartDate}
                    durationInHr={durationInHr}
                    setDurationInHr={setDurationInHr}
                  />
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
