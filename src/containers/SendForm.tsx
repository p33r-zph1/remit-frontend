import { XCircleIcon } from '@heroicons/react/20/solid';
import type { SubmitHandler } from 'react-hook-form';

import useSendMoney, { SendMoney } from '../hooks/useSendMoney';
import useSendOrder from '../hooks/api/useSendOrder';

import RecipientInput from '../components/Input/RecipientInput';
import CurrencyInput from '../components/Input/CurrencyInput';
import SendDetailsForm from './SendDetailsForm';

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
    agentId,
  }) => {
    try {
      await sendOrderAsync({
        recipientId,
        senderCurrency: senderCurrency.currency,
        recipientCurrency: recipientCurrency.currency,
        senderAgentId: agentId,
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

        <SendDetailsForm name="agentId" control={control} />

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
