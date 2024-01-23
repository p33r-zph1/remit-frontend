import { useState } from 'react';
import { MinusIcon, XMarkIcon } from '@heroicons/react/20/solid';

import fiatCurrencies from '../constants/currency';
import RecipientInput from '../components/Input/RecipientInput';
import CurrencyInput from '../components/Input/CurrencyInput';
import usePriceOracle from '../hooks/api/usePriceOracle';

// TODO: implement mobx state management
const defaultCurrency = fiatCurrencies[0];
const secondaryCurrency = fiatCurrencies[1];

function Summary() {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-8 w-0.5 bg-[#E7E9EB]" />

      <div className="space-y-6 py-6">
        <div className="flex items-center justify-between pl-14 pr-4 lg:pr-10">
          <div className="absolute left-6 -ml-px h-5 w-5 rounded-full bg-[#E7E9EB] p-1">
            <MinusIcon
              className="h-full w-full text-sleep-200"
              strokeWidth={2}
            />
          </div>
          <span className="w-1/2 truncate text-sm font-semibold text-sleep-200">
            0.00
          </span>
          <span className="text-sm font-semibold text-sleep-200">
            Platform fee
          </span>
        </div>

        <div className="flex items-center justify-between pl-14 pr-4 lg:pr-10">
          <div className="absolute left-6 -ml-px h-5 w-5 rounded-full bg-[#E7E9EB] p-1">
            <XMarkIcon
              className="h-full w-full text-sleep-200"
              strokeWidth={2}
            />
          </div>
          <select
            value="default"
            onChange={() => {}}
            className="select select-bordered w-full rounded-full shadow-sm duration-200 hover:shadow-md focus:outline-none"
          >
            <option disabled value="default">
              Select agent commision
            </option>

            <option value="a">0.3% - Agent 6443</option>
            <option value="b">0.5% - Agent 2887</option>
            <option value="c">0.8% - Agent 2341</option>
            <option value="d">1% - Agent 8211</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default function SendForm() {
  const [senderFiat, setSenderFiat] = useState(defaultCurrency);
  const [recipientFiat, setRecipientFiat] = useState(secondaryCurrency);

  const [sendAmount, setSendAmount] = useState('');
  const [recipientAmount, setRecipientAmount] = useState('');

  const priceOracleQuery = usePriceOracle({ from: 'INR', to: 'SGD' });

  console.log({ data: priceOracleQuery.data });

  return (
    <form className="mt-12 space-y-14 sm:mt-16">
      <RecipientInput />

      <div>
        <CurrencyInput
          label="You send"
          value={sendAmount}
          onValueChange={values => setSendAmount(values.value)}
          selected={senderFiat}
          list={fiatCurrencies}
          onChange={fiat => setSenderFiat(fiat)}
        />

        <Summary />

        <CurrencyInput
          label="Recipient will get"
          value={recipientAmount}
          onValueChange={values => setRecipientAmount(values.value)}
          selected={recipientFiat}
          list={fiatCurrencies}
          onChange={fiat => setRecipientFiat(fiat)}
        />
      </div>

      {/* Send Money Button */}
      <div className="mt-10">
        <button className="btn btn-primary btn-block rounded-full text-xl font-semibold">
          Send money
        </button>
      </div>
    </form>
  );
}
