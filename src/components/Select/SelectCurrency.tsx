import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronDownIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/20/solid';
import { Fragment, memo } from 'react';
import { twMerge } from 'tailwind-merge';

import { type Currency } from '@/src/schema/currency';

type Props = {
  list: Currency[];
  selected: Currency | undefined;
  onChange: (currency: Currency) => void;
  disabled?: boolean;
};

export default memo(function SelectCurrency({
  list,
  selected,
  onChange,
  disabled,
}: Props) {
  if (list.length === 0 || !selected) {
    return (
      <div className="flex h-20 w-20 flex-col items-center justify-center space-y-1">
        <ExclamationCircleIcon className="h-6 w-6 text-error" />
        <span className="text-xs font-bold text-error">Error</span>
      </div>
    );
  }

  return (
    <div className="z-10">
      <Listbox value={selected} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <Listbox.Button className="relative inline-flex items-center justify-center rounded-full py-3 pl-3 pr-7 text-left text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:text-gray-400 md:text-base">
            {selected.icon && (
              <img
                src={selected.icon}
                width={24}
                height={24}
                alt={`${selected.currency} currency`}
                className="mr-2"
              />
            )}

            <span className="truncate font-bold">{selected.currency}</span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 min-w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {list.map(item => (
                <Listbox.Option
                  key={item.currency}
                  className={({ active }) =>
                    twMerge(
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                      active || selected.currency === item.currency
                        ? 'bg-slate-100 text-primary'
                        : 'text-gray-900'
                    )
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={twMerge(
                          'block truncate text-sm md:text-base',
                          selected ? 'font-bold' : 'font-semibold'
                        )}
                      >
                        {item.currency}
                      </span>

                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
});
