import { type Dispatch, memo, type SetStateAction } from 'react';
import type { Control } from 'react-hook-form';

import CurrencyInput from '@/src/components/Input/CurrencyInput';
import SelectCurrency from '@/src/components/Select/SelectCurrency';
import type { OrderForm } from '@/src/hooks/useOrderForm';
import type { Agent } from '@/src/schema/agent';
import type { Currency } from '@/src/schema/currency';

import CurrencySelectAgent from './CurrencySelectAgent';

type Props = {
  control: Control<OrderForm>;
  conversionHandler: (value: string) => void;
  from: Currency | undefined;
  fromCurrencies: Currency[];
  setFromCurrency: Dispatch<SetStateAction<Currency | undefined>>;
  to: Currency | undefined;
  toCurrencies: Currency[];
  setToCurrency: Dispatch<SetStateAction<Currency | undefined>>;
  agents: Agent[];
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
  agents,
  disabled,
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

      <CurrencySelectAgent name="agentId" control={control} list={agents} />

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
