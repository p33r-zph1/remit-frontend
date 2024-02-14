import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import type { Chain } from 'viem';

import { getChainName } from '../../constants/chains';

type Props<T extends FieldValues> = UseControllerProps<T> & {
  list: Chain[];
};

export default function SelectChain<T extends FieldValues>({
  list,
  ...controllerProps
}: Props<T>) {
  const {
    field: { onChange, value, disabled, ...otherFields },
    formState: { isSubmitting },
    fieldState: { error },
  } = useController(controllerProps);

  return (
    <div className="z-10">
      <Listbox
        value={value}
        onChange={onChange}
        disabled={disabled || isSubmitting}
      >
        <div className="relative mt-1">
          <Listbox.Button
            {...otherFields}
            className={twMerge(
              'relative w-full rounded-full border bg-white py-3 pl-3 pr-10 text-left text-sm shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:bg-slate-100 md:text-base',
              error && 'border border-error text-error'
            )}
          >
            <span className="block truncate">
              {value ? getChainName(value) : 'Select your chain'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {list.map(option => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? 'bg-primary text-primary-content'
                        : 'text-gray-900'
                    }`
                  }
                  value={option.id}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate text-sm md:text-base ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
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
}
