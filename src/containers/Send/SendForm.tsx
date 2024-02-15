import { useNavigate } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { numericFormatter } from 'react-number-format';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import CurrencyInput from '@/src/components/Input/CurrencyInput';
import RecipientInput from '@/src/components/Input/RecipientInput';
import Modal from '@/src/components/Modal';
import useCreateOrder from '@/src/hooks/api/useCreateOrder';
import useSendMoney, { type SendMoney } from '@/src/hooks/useSendMoney';
import { Route } from '@/src/routes/_auth/';

import SendDetails from './SendDetails';

// let renderCount = 0;

export default function SendForm() {
  const navigate = useNavigate({ from: Route.fullPath });

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
    formProps: { control, handleSubmit, getValues },
  } = useSendMoney();

  const {
    mutateAsync: sendOrderAsync,
    isPending: isSendingOrder,
    error,
  } = useCreateOrder();

  const [modalVisible, setModalVisible] = useState(false);
  const [onConfirmSend, setOnConfirmSend] = useState<() => void>();

  const orderAmountSummary = useCallback(() => {
    const recipientAmount = getValues('recipientAmount');
    const sendAmount = getValues('sendAmount');

    const str = `${sendAmount} ${senderCurrency.currency} (${recipientAmount} ${recipientCurrency.currency})`;

    return numericFormatter(str, { thousandSeparator: ',' });
  }, [getValues, recipientCurrency.currency, senderCurrency.currency]);

  const onSubmit: SubmitHandler<SendMoney> = ({
    recipientId,
    sendAmount,
    agentId,
  }) => {
    async function confirmSend() {
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

        setModalVisible(false);

        navigate({
          to: '/order/$orderId',
          params: { orderId: data.orderId },
        });
      } catch (e: unknown) {
        setModalVisible(false);
        console.error(e);
      }
    }

    setOnConfirmSend(() => confirmSend);
    setModalVisible(true);
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
          label="Recipient will get (estimate)"
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
        disabled={isSendingOrder}
      >
        Send money
      </button>

      <Modal
        open={modalVisible}
        isLoading={isSendingOrder}
        onClose={() => setModalVisible(false)}
        actions={{
          confirm: {
            label: 'Send',
            action: () => onConfirmSend?.(),
          },
          cancel: {
            label: 'Cancel',
          },
        }}
        slideFrom="top"
        title="Confirm send money"
        size="medium"
      >
        <p className="text-balance text-slate-500">
          You&apos;re about to send{' '}
          <span className="font-bold">{orderAmountSummary()}</span> to {` `}
          <span className="font-bold">{getValues('recipientId')}</span> with
          agent <span className="font-bold">#{getValues('agentId')}</span>.
          <br />
          <br />
          Are you sure you want to continue?
        </p>
      </Modal>
    </form>
  );
}
