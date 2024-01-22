import { useState } from 'react';
import { MinusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { NumericFormat } from 'react-number-format';

import SelectCurrency from '../components/SelectCurrency';
import fiatCurrencies, { Currency } from '../constants/currency';
import Page from '../components/Page';

// TODO: implement mobx state management
const defaultCurrency = fiatCurrencies[0];
const secondaryCurrency = fiatCurrencies[1];

export default function SendMoney() {
  const [senderFiat, setSenderFiat] = useState(defaultCurrency);
  const [recipientFiat, setRecipientFiat] = useState(secondaryCurrency);

  const [sendAmount, setSendAmount] = useState('');

  return (
    <Page className="mx-auto max-w-sm md:max-w-lg lg:justify-center">
      {/* Recipient Input */}
      <label className="mt-4 flex flex-col sm:mt-16">
        <span className="label-text text-base text-sleep-100">Recipient</span>
        <NumericFormat
          inputMode="numeric"
          placeholder="Enter recipient number"
          className="input input-ghost border-0 p-0 text-2xl font-bold placeholder:text-lg placeholder:opacity-50 focus:outline-none"
        />
      </label>
      {/* Sender: Fiat Currency Selection & Input */}
      <div className="relative mt-12 flex flex-col">
        <span className="absolute left-8 top-3 text-sm text-sleep-200">
          You send
        </span>
        <NumericFormat
          thousandSeparator
          inputMode="decimal"
          value={sendAmount}
          onValueChange={values => setSendAmount(values.value)}
          className="rounded-full border-primary pb-3 pl-8 pr-32 pt-9 text-xl font-bold transition-shadow duration-200"
          placeholder="0.00"
        />

        <div className="absolute inset-y-0 right-0 flex items-center border-l">
          <SelectCurrency<Currency>
            selected={senderFiat}
            currencies={fiatCurrencies}
            disabled={false}
            hideChevron={false}
            onChange={fiat => setSenderFiat(fiat)}
          />
        </div>
      </div>
      {/* Conversion & Fee Summary */}
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
      {/* Recipient: Fiat Currency Selection & Input */}
      <div className="relative flex flex-col">
        <span className="absolute left-8 top-3 text-sm text-sleep-200">
          Recipient will get
        </span>
        <NumericFormat
          thousandSeparator
          inputMode="decimal"
          className="rounded-full border-primary pb-3 pl-8 pr-32 pt-9 text-xl font-bold transition-shadow duration-200"
          placeholder="0.00"
        />

        <div className="absolute inset-y-0 right-0 flex items-center border-l">
          <SelectCurrency<Currency>
            selected={recipientFiat}
            currencies={fiatCurrencies}
            disabled={false}
            hideChevron={false}
            onChange={fiat => setRecipientFiat(fiat)}
          />
        </div>
      </div>
      {/* Send Money Button */}
      <div className="mt-16">
        <button className="btn btn-primary btn-block rounded-full text-xl font-semibold">
          Send money
        </button>
      </div>
    </Page>
  );
}
