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
  selected: Currency;
  onChange: (currency: Currency) => void;
  disabled?: boolean;
  hideChevron?: true;
};

export default memo(function SelectCurrency({
  list,
  selected,
  onChange,
  disabled,
  hideChevron,
}: Props) {
  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-x-2 px-4 py-2">
        <ExclamationCircleIcon className="h-6 w-6 text-red-400" />
        <span className="pr-2 text-xs font-bold text-red-400">Error</span>
      </div>
    );
  }

  return (
    <Listbox value={selected} onChange={onChange} disabled={disabled}>
      <div className="relative">
        <Listbox.Button className="rounded-4xl inline-flex items-center justify-center px-4 py-2 font-bold disabled:cursor-not-allowed">
          {selected.icon && (
            <img
              src={selected.icon}
              width={24}
              height={24}
              alt={`${selected.currency} currency`}
              className="mr-2"
            />
          )}
          <span className="lg:text-md text-sm">{selected.currency}</span>
          {hideChevron ? (
            <span className="mr-8" />
          ) : (
            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-gray-400 hover:text-gray-800" />
          )}
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 min-w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {list.map(currency => (
              <Listbox.Option
                key={currency.currency}
                className={({ active }) =>
                  twMerge(
                    active ? ' text-primary' : '',
                    'relative cursor-default select-none py-2 pl-10 pr-4'
                  )
                }
                value={currency}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={twMerge(
                        selected ? 'font-bold' : 'font-semibold',
                        'block truncate'
                      )}
                    >
                      {currency.currency}
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
  );
});
