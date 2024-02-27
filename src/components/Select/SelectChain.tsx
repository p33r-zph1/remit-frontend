import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Fragment } from 'react';
import {
  type FieldValues,
  useController,
  type UseControllerProps,
} from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import { type Chains, getSupportedChain } from '@/src/configs/wagmi';

type Props<T extends FieldValues> = UseControllerProps<T> & {
  readonly list: Chains;
  label?: string;
};

export default function SelectChain<T extends FieldValues>({
  list,
  label,
  ...controllerProps
}: Props<T>) {
  const {
    field: { onChange, value, disabled, ...otherFields },
    formState: { isSubmitting },
    fieldState: { error },
  } = useController(controllerProps);

  const chainId = z.coerce.number().parse(value || '');

  return (
    <div className="form-control z-10 space-y-1">
      <div className="label">
        {label && (
          <span className="label-text text-sm text-zinc-400 md:text-base">
            {label}
          </span>
        )}

        {error && (
          <span className="label-text text-xs font-bold text-error">
            {error.message}
          </span>
        )}
      </div>

      <Listbox
        value={chainId}
        onChange={onChange}
        disabled={disabled || isSubmitting}
      >
        <div className="relative">
          <Listbox.Button
            {...otherFields}
            className={twMerge(
              'relative w-full rounded-full border bg-white py-3 pl-3 pr-10 text-left text-sm font-medium shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-gray-400 md:text-base',
              error && 'border border-error text-error'
            )}
          >
            <span className="block truncate">
              {(() => {
                if (!chainId) return 'Select your chain';

                const chain = getSupportedChain(chainId);
                return chain ? chain.name : 'Unsupported chain';
              })()}
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
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {list.map(({ id, name }) => (
                <Listbox.Option
                  key={id}
                  className={({ active }) =>
                    twMerge(
                      'relative cursor-default select-none py-2 pl-10 pr-4',
                      active ? 'bg-slate-100' : 'text-gray-900'
                    )
                  }
                  value={id}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={twMerge(
                          'block truncate text-sm md:text-base',
                          selected ? 'font-medium text-primary' : 'font-normal'
                        )}
                      >
                        {name}
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
}
