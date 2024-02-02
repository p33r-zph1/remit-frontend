import type { SubmitHandler } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';

import SendDetailsForm from './SendDetailsForm';
import useSendMoney, { SendMoney } from '../hooks/useSendMoney';
import useSendOrder from '../hooks/api/useSendOrder';

import RecipientInput from '../components/Input/RecipientInput';
import CurrencyInput from '../components/Input/CurrencyInput';
import ErrorAlert from '../components/Alert/ErrorAlert';

// const orderData = {
//   recipientId: '12340002',
//   senderAgentId: '43210002',
//   transferAmount: 100000,
//   senderCurrency: 'INR',
//   recipientCurrency: 'SGD',
// };

// let renderCount = 0;

export default function SendForm() {
  const navigate = useNavigate();

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

    // agents list
    agents,

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
      const { data } = await sendOrderAsync({
        recipientId,
        senderCurrency: senderCurrency.currency,
        recipientCurrency: recipientCurrency.currency,
        senderAgentId: agentId,
        transferAmount: Number(sendAmount),
      });

      navigate({
        to: '/transfer/$orderId',
        params: { orderId: data.orderId },
      });
    } catch (e: unknown) {
      console.log(e);
    }
  };

  // renderCount++;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-8 space-y-12 sm:mt-16"
    >
      {/* <p>Render count: {renderCount / 2}</p> */}

      <RecipientInput name="recipientId" control={control} />

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

        <SendDetailsForm name="agentId" control={control} list={agents} />

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

      {error?.message && <ErrorAlert message={error.message} />}

      <button
        type="submit"
        className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
        disabled={isSubmitting}
      >
        {isSubmitting && <span className="loading loading-spinner"></span>}
        Send money
      </button>
    </form>
  );
}
