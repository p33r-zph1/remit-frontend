import { MinusIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import type { SubmitHandler } from 'react-hook-form';

import useSendMoney, { SendMoney } from '../hooks/useSendMoney';
import useSendOrder from '../hooks/api/useSendOrder';

import RecipientInput from '../components/Input/RecipientInput';
import CurrencyInput from '../components/Input/CurrencyInput';

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

// const orderData = {
//   recipientId: '12340002',
//   senderAgentId: '43210002',
//   transferAmount: 100000,
//   senderCurrency: 'INR',
//   recipientCurrency: 'SGD',
// };

// let renderCount = 0;

export default function SendForm() {
  const {
    // currency dropdown controlled state
    senderCurrency,
    setSenderCurrency,
    recipientCurrency,
    setRecipientCurrency,

    // callback function for calculating the conversion
    conversionHandler,

    // list of exchange currencies
    supportedCurrencies,

    // hook form props
    formProps: {
      control,
      handleSubmit,
      formState: { isSubmitting },
    },
  } = useSendMoney();

  const { mutateAsync: sendOrderAsync, error } = useSendOrder();

  const onSubmit: SubmitHandler<SendMoney> = async ({
    recipientId,
    sendAmount,
  }) => {
    try {
      await sendOrderAsync({
        recipientId,
        senderCurrency: senderCurrency.currency,
        recipientCurrency: recipientCurrency.currency,
        senderAgentId: '43210002',
        transferAmount: Number(sendAmount),
      });
    } catch (e: unknown) {
      console.log(e);
    }
  };

  // renderCount++;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4 sm:mt-16">
      {/* <p>Render count: {renderCount / 2}</p> */}

      <div className="mb-10">
        <RecipientInput name="recipientId" control={control} />
      </div>

      <div>
        <CurrencyInput
          label="You send"
          name="sendAmount"
          control={control}
          selected={senderCurrency}
          list={supportedCurrencies}
          onCurrencyChange={setSenderCurrency}
          onValueChange={conversionHandler}
        />

        <Summary disabled={isSubmitting} />

        <CurrencyInput
          label="Recipient will get"
          name="recipientAmount"
          control={control}
          selected={recipientCurrency}
          list={supportedCurrencies}
          onCurrencyChange={setRecipientCurrency}
          readOnly
        />
      </div>

      {error?.message && (
        <div role="alert" className="alert shadow-lg">
          <XCircleIcon className="h-5 w-5 text-error" />
          <div>
            <h3 className="font-bold text-error">Error</h3>
            <div className="text-xs text-error">{error.message}</div>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-block mt-10 rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
        disabled={isSubmitting}
      >
        {isSubmitting && <span className="loading loading-spinner"></span>}
        Send money
      </button>
    </form>
  );
}
