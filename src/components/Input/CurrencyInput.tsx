import { NumericFormat } from 'react-number-format';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

import SelectCurrency from '../Select/SelectCurrency';
import { Currency } from '../../schema/currency';

type Props<T extends FieldValues> = UseControllerProps<T> & {
  label: string;
  list: Currency[];
  selected: Currency | undefined;
  onCurrencyChange: (currency: Currency) => void;
  onValueChange?: (value: string) => void;
  readOnly?: boolean;
};

export default function CurrencyInput<T extends FieldValues>({
  label,
  list,
  selected,
  onCurrencyChange,
  onValueChange,
  readOnly,
  ...controllerProps
}: Props<T>) {
  const {
    field: { ref, onChange, ...otherFields },
    formState: { isSubmitting },
  } = useController(controllerProps);

  return (
    <div className="relative flex flex-col">
      <span className="absolute left-8 top-3 text-sm text-sleep-200">
        {label}
      </span>

      <NumericFormat
        thousandSeparator
        autoComplete="off"
        inputMode="decimal"
        className="rounded-full border-primary pb-3 pl-8 pr-32 pt-9 text-xl font-bold transition-shadow duration-200 disabled:cursor-not-allowed disabled:border-slate-400 disabled:bg-slate-100"
        placeholder="0.00"
        readOnly={readOnly}
        disabled={isSubmitting}
        {...otherFields}
        getInputRef={ref}
        onValueChange={values => {
          onChange(values.value);
          onValueChange?.(values.value);
        }}
      />

      <div className="absolute inset-y-0 right-0 flex items-center border-l">
        <SelectCurrency<Currency>
          selected={selected}
          currencies={list}
          disabled={isSubmitting}
          hideChevron={false}
          onChange={onCurrencyChange}
        />
      </div>
    </div>
  );
}
