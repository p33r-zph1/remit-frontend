import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { type ComponentPropsWithRef, type ElementRef, forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

type Props = ComponentPropsWithRef<'div'> & {
  value: string | number | undefined;
  onClick: () => void;
  placeholder: string;
  disabled: boolean;
  error?: FieldError;
  label?: string;
};

const SelectViaModal = forwardRef<ElementRef<'div'>, Props>(
  (
    { value, onClick, placeholder, disabled, error, label, ...divProps }: Props,
    ref
  ) => {
    return (
      <label className="form-control">
        <div className="label">
          <span className="label-text text-sm text-zinc-400 md:text-base">
            {label}
          </span>

          {error && (
            <span className="label-text text-xs font-bold text-error">
              {error.message}
            </span>
          )}
        </div>

        <div
          ref={ref}
          className={twMerge(
            'flex h-10 select-none items-center rounded-full bg-white py-3 pl-3 pr-2 text-sm font-medium shadow-md hover:cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary md:text-base',
            error ? 'input-error text-error' : '',
            disabled
              ? 'bg-slate-100 text-gray-400 hover:cursor-not-allowed'
              : ''
          )}
          tabIndex={0}
          onClick={() => !disabled && onClick()}
          onKeyDown={() => !disabled && onClick()}
          {...divProps}
        >
          <span className="grow ">{value || placeholder}</span>

          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
        </div>
      </label>
    );
  }
);

SelectViaModal.displayName = 'SelectViaModal';

export default SelectViaModal;
