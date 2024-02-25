import { useController, type UseControllerProps } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

import type { SendMoney } from '@/src/hooks/useSendMoney';

export default function RecipientInput(props: UseControllerProps<SendMoney>) {
  const {
    field: { ref, value, onChange, disabled, ...otherFields },
    formState: { isSubmitting },
    fieldState: { error },
  } = useController(props);

  const inputValue = z.coerce.string().parse(value);

  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text text-base text-zinc-400">Recipient</span>

        {error?.message && (
          <span className="label-text text-xs font-bold  text-error">
            {error.message}
          </span>
        )}
      </div>

      <NumericFormat
        inputMode="numeric"
        autoComplete="off"
        placeholder="Enter recipient number"
        className={twMerge(
          'input input-ghost rounded-none border-0 p-0 text-2xl font-bold placeholder:text-lg placeholder:opacity-50 focus:outline-none disabled:bg-white',
          error && 'border-b border-error'
        )}
        disabled={disabled || isSubmitting}
        {...otherFields}
        getInputRef={ref}
        value={inputValue}
        onValueChange={values => onChange(values.value)}
      />
    </label>
  );
}
