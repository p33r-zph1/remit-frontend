import { Transition } from '@headlessui/react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Fragment, type ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  renderTitle: ReactNode;
  isFetching: boolean;
  refetch: () => void;
};

export default function HeaderRefresh({
  renderTitle,
  isFetching,
  refetch,
}: Props) {
  return (
    <header className="flex items-center justify-between">
      {renderTitle}

      <button
        type="button"
        className={twMerge(
          'btn btn-circle btn-ghost relative -mr-4 md:mb-6 md:mt-14'
        )}
        onClick={refetch}
      >
        <Transition
          appear
          show={!isFetching}
          as={Fragment}
          enter="transition ease-out"
          enterFrom="scale-0"
          enterTo="scale-100"
        >
          <ArrowPathIcon className="absolute h-6 w-6" />
        </Transition>

        <Transition
          appear
          show={isFetching}
          as={Fragment}
          enter="transition ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <ArrowPathIcon className="absolute h-6 w-6 animate-spin text-primary" />
        </Transition>
      </button>
    </header>
  );
}
