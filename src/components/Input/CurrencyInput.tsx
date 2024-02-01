import { NumericFormat, OnValueChange } from 'react-number-format';

import SelectCurrency from '../Select/SelectCurrency';
import { Currency } from '../../schema/currency';

type Props = {
  label: string;
  value: number | string | null;
  onValueChange: OnValueChange;
  selected: Currency | undefined;
  list: Currency[];
  onChange: (currency: Currency) => void;
  disabled?: boolean;
};

export default function CurrencyInput({
  label,
  value,
  onValueChange,
  selected,
  list,
  onChange,
  disabled,
}: Props) {
  return (
    <div className="relative flex flex-col">
      <span className="absolute left-8 top-3 text-sm text-sleep-200">
        {label}
      </span>

      <NumericFormat
        thousandSeparator
        inputMode="decimal"
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        className="rounded-full border-primary pb-3 pl-8 pr-32 pt-9 text-xl font-bold transition-shadow duration-200"
        placeholder="0.00"
      />

      <div className="absolute inset-y-0 right-0 flex items-center border-l">
        <SelectCurrency<Currency>
          selected={selected}
          currencies={list}
          disabled={disabled}
          hideChevron={false}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
