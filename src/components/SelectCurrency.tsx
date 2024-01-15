import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronDownIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/20/solid';

import { Currency } from '../constants/currency';
import { cx } from '../utils';

interface Props<T> {
  currencies: T[];
  selected: T | undefined;
  disabled?: boolean;
  onChange: (currency: T) => void;
  hideChevron?: boolean;
}

export default function SelectCurrency<T extends Currency>({
  currencies,
  selected,
  disabled,
  onChange,
  hideChevron = false,
}: Props<T>) {
  if (currencies.length === 0 || !selected) {
    return (
      <div className="flex flex-col justify-center items-center space-x-2 px-4 py-2">
        <ExclamationCircleIcon className="w-6 h-6 text-red-400" />
        <span className="text-xs font-bold text-red-400 pr-2">Error</span>
      </div>
    );
  }

  return (
    <Listbox value={selected} onChange={onChange} disabled={disabled}>
      <div className="relative">
        <Listbox.Button className="inline-flex items-center justify-center  rounded-4xl px-4 py-2 font-bold">
          {selected.icon && (
            <img
              src={selected.icon}
              width={24}
              height={24}
              alt={`${selected.symbol} symbol`}
              className="mr-2"
            />
          )}
          <span className="text-sm lg:text-md">{selected.symbol}</span>
          {hideChevron ? (
            <span className="mr-8" />
          ) : (
            <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-sleep-200 hover:text-gray-800" />
          )}
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 min-w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {currencies.map((currency, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  cx(
                    active ? ' text-brand' : '',
                    'relative cursor-default select-none py-2 pl-10 pr-4'
                  )
                }
                value={currency}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={cx(
                        selected ? 'font-bold' : 'font-semibold',
                        'block truncate'
                      )}
                    >
                      {currency.symbol}
                    </span>

                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand">
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
}
