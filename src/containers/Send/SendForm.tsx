import { useNavigate } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { numericFormatter } from 'react-number-format';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import RecipientInput from '@/src/components/Input/RecipientInput';
import Modal from '@/src/components/Modal';
import SelectChain from '@/src/components/Select/SelectChain';
import wagmi from '@/src/configs/wagmi';
import useCreateOrder from '@/src/hooks/api/useCreateOrder';
import useSendMoney, { type SendMoney } from '@/src/hooks/useSendMoney';
import { Route } from '@/src/routes/_auth/';

import CurrencyForm from './-components/CurrencyForm';
import SelectOrderType from './-components/SelectOrderType';

// let renderCount = 0;

export default function SendForm() {
  const navigate = useNavigate({ from: Route.fullPath });

  const {
    // currency dropdown controlled state
    senderCurrency,
    setSenderCurrency,
    recipientCurrency,
    setRecipientCurrency,

    // callback function for calculating the `recipientAmount`
    conversionHandler,

    // list of exchange currencies
    supportedCurrencies,
    supportedTokens,

    // agents list
    agents,

    // hook form props
    formProps: {
      control,
      handleSubmit,
      getValues,
      setError,
      formState: { isSubmitting },
    },
  } = useSendMoney();

  const {
    data: sendOrderData,
    mutateAsync: sendOrderAsync,
    isPending: isSendingOrder,
    isSuccess: isSendOrderSuccess,
    error,
  } = useCreateOrder();

  const [modalVisible, setModalVisible] = useState(false);
  const [onConfirmSend, setOnConfirmSend] = useState<() => void>();

  const orderAmountSummary = useCallback(() => {
    const sendAmount = getValues('senderAmount');
    const recipientAmount = getValues('recipientAmount');

    if (!senderCurrency?.currency || !recipientCurrency?.currency)
      throw new Error('Sender/Recipient currency not found...');

    const str = `${sendAmount} ${senderCurrency.currency} (${recipientAmount} ${recipientCurrency.currency})`;

    return numericFormatter(str, { thousandSeparator: ',' });
  }, [getValues, recipientCurrency?.currency, senderCurrency?.currency]);

  const onSubmit: SubmitHandler<SendMoney> = data => {
    const { senderAmount, recipientId, agentId } = data;

    if (getValues('orderType') !== 'CROSS_BORDER_REMITTANCE') {
      // await delay(3000);
      return alert(JSON.stringify(JSON.stringify(data))); // TODO: handle other orderTypes
    }

    async function confirmSend() {
      try {
        if (!senderCurrency?.currency || !recipientCurrency?.currency) {
          setError('senderAmount', {
            message: 'Sender/Recipient currency not found...',
          });
          setModalVisible(false);
          return;
        }

        await sendOrderAsync({
          orderType: getValues('orderType'),
          body: {
            transferAmount: Number(senderAmount),
            senderCurrency: senderCurrency.currency,
            recipientId: recipientId || '??', // FIXME: refactor `orderBodySchema` that considers orderType requirements
            recipientCurrency: recipientCurrency.currency,
            senderAgentId: agentId,
          },
        });

        setModalVisible(false);
      } catch (e: unknown) {
        setModalVisible(false);
        console.error(e);
      }
    }

    setOnConfirmSend(() => confirmSend);
    setModalVisible(true);
  };

  const onNavigateToOrder = useCallback(() => {
    if (isSendOrderSuccess) {
      navigate({
        to: '/order/$orderId',
        params: { orderId: sendOrderData.data.orderId },
      });
    }
  }, [isSendOrderSuccess, navigate, sendOrderData?.data.orderId]);

  // renderCount++;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-8 sm:mt-8">
      {/* <p>Render count: {renderCount / 2}</p> */}

      {(() => {
        switch (getValues('orderType')) {
          case 'CROSS_BORDER_REMITTANCE':
            return (
              <>
                <SelectOrderType name="orderType" control={control} />

                <RecipientInput name="recipientId" control={control} />

                <CurrencyForm
                  control={control}
                  conversionHandler={conversionHandler}
                  from={senderCurrency}
                  setFromCurrency={setSenderCurrency}
                  fromCurrencies={supportedCurrencies}
                  to={recipientCurrency}
                  setToCurrency={setRecipientCurrency}
                  toCurrencies={supportedCurrencies}
                  agents={agents}
                  disabled={isSubmitting}
                />
              </>
            );

          case 'LOCAL_SELL_STABLECOINS':
            return (
              <>
                <SelectOrderType name="orderType" control={control} />

                <SelectChain
                  name="chainId"
                  control={control}
                  list={wagmi.chains}
                  label="Blockchain Network"
                />

                <CurrencyForm
                  control={control}
                  conversionHandler={conversionHandler}
                  from={senderCurrency}
                  setFromCurrency={setSenderCurrency}
                  fromCurrencies={supportedTokens}
                  to={recipientCurrency}
                  setToCurrency={setRecipientCurrency}
                  toCurrencies={supportedCurrencies}
                  agents={agents}
                  disabled={isSubmitting}
                />
              </>
            );

          case 'LOCAL_BUY_STABLECOINS':
            return (
              <>
                <SelectOrderType name="orderType" control={control} />

                <SelectChain
                  name="chainId"
                  control={control}
                  list={wagmi.chains}
                  label="Blockchain Network"
                />

                <CurrencyForm
                  control={control}
                  conversionHandler={conversionHandler}
                  from={senderCurrency}
                  setFromCurrency={setSenderCurrency}
                  fromCurrencies={supportedCurrencies}
                  to={recipientCurrency}
                  setToCurrency={setRecipientCurrency}
                  toCurrencies={supportedTokens}
                  agents={agents}
                  disabled={isSubmitting}
                />
              </>
            );

          default:
            return null;
        }
      })()}

      {error && <ErrorAlert message={error.message} />}

      <button
        type="submit"
        className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
        disabled={isSubmitting || isSendingOrder}
      >
        Send money
      </button>

      <Modal
        open={modalVisible}
        isLoading={isSendingOrder}
        onClose={() => setModalVisible(false)}
        onCloseComplete={onNavigateToOrder}
        type="action"
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
        </p>
      </Modal>
    </form>
  );
}
