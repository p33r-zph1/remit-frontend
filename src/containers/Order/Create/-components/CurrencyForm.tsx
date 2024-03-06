import { MinusIcon } from '@heroicons/react/24/outline';
import {
  type Dispatch,
  memo,
  type PropsWithChildren,
  type SetStateAction,
} from 'react';
import type { Control } from 'react-hook-form';

import CurrencyInput from '@/src/components/Input/CurrencyInput';
import SelectCurrency from '@/src/components/Select/SelectCurrency';
import type { OrderForm } from '@/src/hooks/useOrderForm';
import type { Currency } from '@/src/schema/currency';

type Props = PropsWithChildren & {
  control: Control<OrderForm>;
  conversionHandler: (value: string) => void;
  from: Currency | undefined;
  fromCurrencies: Currency[];
  setFromCurrency: Dispatch<SetStateAction<Currency | undefined>>;
  to: Currency | undefined;
  toCurrencies: Currency[];
  setToCurrency: Dispatch<SetStateAction<Currency | undefined>>;
  disabled: boolean;
};

export default memo(function CurrencyForm({
  control,
  conversionHandler,
  from,
  setFromCurrency,
  fromCurrencies,
  to,
  setToCurrency,
  toCurrencies,
  disabled,
  children,
}: Props) {
  return (
    <div>
      <div className="divider my-8"></div>

      <CurrencyInput
        label="You send"
        name="fromAmount"
        control={control}
        onValueChange={conversionHandler}
      >
        <SelectCurrency
          selected={from}
          list={fromCurrencies}
          onChange={newFrom =>
            setFromCurrency(prevFrom => {
              if (newFrom.currency === to?.currency) {
                setToCurrency(prevFrom); // swaps currency
              }

              return newFrom;
            })
          }
          disabled={disabled}
        />
      </CurrencyInput>

      <div className="relative">
        <div className="absolute inset-y-0 left-8 w-0.5 bg-[#E7E9EB]" />

        <div className="space-y-6 py-6">
          <div className="flex items-center justify-between pl-14 pr-4 lg:pr-10">
            <div className="absolute left-6 -ml-px h-5 w-5 rounded-full bg-[#E7E9EB] p-1">
              <MinusIcon
                className="h-full w-full text-gray-400"
                strokeWidth={2}
              />
            </div>
            <span className="w-1/2 truncate text-sm font-semibold text-gray-400">
              ~ 1.00%
            </span>
            <span className="text-sm font-semibold text-gray-400">
              Platform fee
            </span>
          </div>

          {children}
        </div>
      </div>

      <CurrencyInput
        label="Recipient will get (estimate)"
        name="toAmount"
        control={control}
        readOnly
      >
        <SelectCurrency
          selected={to}
          list={toCurrencies}
          onChange={newTo =>
            setToCurrency(prevTo => {
              if (newTo.currency === from?.currency) {
                setFromCurrency(prevTo); // swaps currency
              }

              return newTo;
            })
          }
          disabled={disabled}
        />
      </CurrencyInput>
    </div>
  );
});
