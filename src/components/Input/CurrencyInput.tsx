import { type ReactNode } from 'react';
import { useController, type UseControllerProps } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import type { OrderForm } from '@/src/hooks/useOrder';

type Props = UseControllerProps<OrderForm> & {
  label: string;
  children: ReactNode;
  onValueChange?: (value: string) => void;
  readOnly?: true;
};

export default function CurrencyInput({
  label,
  readOnly,
  children,
  onValueChange,
  ...controllerProps
}: Props) {
  const {
    field: { ref, onChange, value, disabled, ...otherFields },
    formState: { isSubmitting },
    fieldState: { error },
  } = useController(controllerProps);

  const inputValue = z.coerce.string().parse(value);

  return (
    <div className="relative flex flex-col">
      <span className="absolute left-8 top-3 text-sm text-gray-400">
        {label}
      </span>

      <NumericFormat
        thousandSeparator
        autoComplete="off"
        inputMode="decimal"
        className={twMerge(
          'input h-20 rounded-full pb-3 pl-8 pr-32 pt-9 text-xl font-bold disabled:cursor-not-allowed disabled:border-slate-400 disabled:bg-slate-100 disabled:text-gray-400',
          error ? 'input-error' : 'input-primary'
        )}
        placeholder="0.00"
        readOnly={readOnly}
        disabled={disabled || isSubmitting}
        {...otherFields}
        value={inputValue}
        getInputRef={ref}
        onValueChange={values => {
          onChange(values.value);
          onValueChange?.(values.value);
        }}
      />

      <div className="absolute inset-y-0 right-0 flex items-center border-l">
        {children}
      </div>
    </div>
  );
}
