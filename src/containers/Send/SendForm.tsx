import { useNavigate } from '@tanstack/react-router';
import type { SubmitHandler } from 'react-hook-form';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import CurrencyInput from '@/src/components/Input/CurrencyInput';
import RecipientInput from '@/src/components/Input/RecipientInput';
import useCreateOrder from '@/src/hooks/api/useCreateOrder';
import useSendMoney, { type SendMoney } from '@/src/hooks/useSendMoney';

import SendDetails from './SendDetails';

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

  const { mutateAsync: sendOrderAsync, error } = useCreateOrder();

  const onSubmit: SubmitHandler<SendMoney> = async ({
    recipientId,
    sendAmount,
    agentId,
  }) => {
    try {
      const { data } = await sendOrderAsync({
        body: {
          recipientId,
          senderCurrency: senderCurrency.currency,
          recipientCurrency: recipientCurrency.currency,
          senderAgentId: agentId,
          transferAmount: Number(sendAmount),
        },
      });

      navigate({
        to: '/order/$orderId',
        params: { orderId: data.orderId },
      });
    } catch (e: unknown) {
      console.error(e);
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
          onCurrencyChange={newCurrency =>
            setSenderCurrency(prevCurrency => {
              if (newCurrency.currency === recipientCurrency.currency) {
                setRecipientCurrency(prevCurrency); // swaps currency
              }

              return newCurrency;
            })
          }
          onValueChange={conversionHandler}
        />

        <SendDetails name="agentId" control={control} list={agents} />

        <CurrencyInput
          label="Recipient will get"
          name="recipientAmount"
          control={control}
          selected={recipientCurrency}
          list={supportedCurrencies}
          onCurrencyChange={newCurrency =>
            setRecipientCurrency(prevCurrency => {
              if (newCurrency.currency === senderCurrency.currency) {
                setSenderCurrency(prevCurrency); // swaps currency
              }

              return newCurrency;
            })
          }
          readOnly
        />
      </div>

      {error && <ErrorAlert message={error.message} />}

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
