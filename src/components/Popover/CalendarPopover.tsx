import { Fragment, useState } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { CalendarIcon } from '@heroicons/react/20/solid';
import { format, startOfToday } from 'date-fns';

import Calendar from '../Calendar';
import { cx } from '../../utils';

export default function CalendarPopover() {
  const [date, setDate] = useState(startOfToday());

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
                {format(date, 'MMMM dd, yyyy h:mm a')}
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
                  <Calendar today={date} onChange={setDate} />
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
