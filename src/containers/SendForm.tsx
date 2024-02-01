import { FormEvent } from 'react';
import { MinusIcon, XMarkIcon } from '@heroicons/react/20/solid';

import RecipientInput from '../components/Input/RecipientInput';
import CurrencyInput from '../components/Input/CurrencyInput';
import useSendMoney from '../hooks/useSendMoney';
import useSendOrder from '../hooks/api/useSendOrder';

function Summary({ disabled }: { disabled: boolean }) {
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
            disabled={disabled}
            onChange={() => {}}
            className="select select-bordered w-full rounded-full shadow-sm duration-200 hover:shadow-md focus:outline-none disabled:border-slate-400"
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

const orderData = {
  recipientId: '12340002',
  senderAgentId: '43210002',
  transferAmount: 100000,
  senderCurrency: 'INR',
  recipientCurrency: 'SGD',
};

export default function SendForm() {
  const {
    currencyList,

    // select currency dropdown state & setter
    senderCurrency,
    setSenderCurrency,
    recipientCurrency,
    setRecipientCurrency,

    // controlled input state
    sendAmount,
    recipientAmount,
    amountHandler,
  } = useSendMoney();

  const {
    data: order,
    mutateAsync: sendOrder,
    isPending,
  } = useSendOrder(orderData);

  console.log({ order });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    sendOrder();
  }

  return (
    <form onSubmit={onSubmit} className="mt-12 space-y-14 sm:mt-16">
      <RecipientInput />

      <div>
        <CurrencyInput
          label="You send"
          value={sendAmount}
          onValueChange={values => amountHandler(values.value)}
          selected={senderCurrency}
          list={currencyList}
          onChange={fiat => setSenderCurrency(fiat)}
          disabled={isPending}
        />

        <Summary disabled={isPending} />

        <CurrencyInput
          label="Recipient will get"
          value={recipientAmount}
          onValueChange={() => {}}
          selected={recipientCurrency}
          list={currencyList}
          onChange={fiat => setRecipientCurrency(fiat)}
          disabled={isPending}
          readOnly
        />
      </div>

      <div className="mt-10">
        <button
          type="submit"
          className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
          disabled={isPending}
        >
          {isPending && <span className="loading loading-spinner"></span>}
          Send money
        </button>
      </div>
    </form>
  );
}
