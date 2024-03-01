import { useCallback } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import RecipientInput from '@/src/components/Input/RecipientInput';
import Modal from '@/src/components/Modal';
import SelectChain from '@/src/components/Select/SelectChain';
import SelectOrderType from '@/src/components/Select/SelectOrderType';
import wagmi, { getSupportedChain } from '@/src/configs/wagmi';
import useOrder from '@/src/hooks/useOrder';
import useOrderForm, { type OrderForm } from '@/src/hooks/useOrderForm';

import CurrencyForm from './-components/CurrencyForm';

// let renderCount = 0;

export default function CreateOrder() {
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
  } = useOrderForm();

  const {
    // callbacks
    executeFn,
    onCrossBorderCreateOrder,
    orderAmountSummary,
    onNavigateToOrder,

    // state
    modalVisible,
    setModalVisible,
    isSendingOrder,

    // error
    createOrderError,
  } = useOrder();

  const onSubmit: SubmitHandler<OrderForm> = data => {
    if (!senderCurrency?.currency) {
      setError('senderAmount', {
        message: 'Sender currency not found...',
      });

      setModalVisible(false);
      return;
    }

    if (!recipientCurrency?.currency) {
      setError('recipientAmount', {
        message: 'Recipient currency not found...',
      });

      setModalVisible(false);
      return;
    }

    onCrossBorderCreateOrder(data, senderCurrency, recipientCurrency);
  };

  const orderType = useCallback(() => {
    switch (getValues('orderType')) {
      case 'CROSS_BORDER_REMITTANCE':
      case 'CROSS_BORDER_SELF_REMITTANCE':
        return 'Send money';

      case 'LOCAL_BUY_STABLECOINS':
        return 'Buy stablecoins';

      case 'LOCAL_SELL_STABLECOINS':
        return 'Sell stablecoins';
    }
  }, [getValues]);

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

      {createOrderError && <ErrorAlert message={createOrderError.message} />}

      <button
        type="submit"
        className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
        disabled={isSubmitting || isSendingOrder}
      >
        {orderType()}
      </button>

      <Modal
        open={modalVisible}
        isLoading={isSendingOrder}
        onClose={() => setModalVisible(false)}
        onCloseComplete={onNavigateToOrder}
        type="action"
        actions={{
          confirm: {
            label: 'Continue',
            action: () => executeFn?.(),
          },
          cancel: {
            label: 'Cancel',
          },
        }}
        slideFrom="top"
        title={`Confirm ${orderType().toLowerCase()}`}
        size="medium"
      >
        <p className="text-balance text-slate-500">
          You&apos;re about to {` `}
          {(() => {
            switch (getValues('orderType')) {
              case 'CROSS_BORDER_REMITTANCE':
              case 'CROSS_BORDER_SELF_REMITTANCE':
                return 'send';

              case 'LOCAL_BUY_STABLECOINS':
                return 'buy';

              case 'LOCAL_SELL_STABLECOINS':
                return 'sell';
            }
          })()}{' '}
          <span className="font-bold">
            {(() => {
              switch (getValues('orderType')) {
                case 'CROSS_BORDER_REMITTANCE':
                case 'CROSS_BORDER_SELF_REMITTANCE':
                  return orderAmountSummary(
                    getValues('senderAmount'),
                    getValues('recipientAmount'),
                    senderCurrency,
                    recipientCurrency
                  );

                case 'LOCAL_BUY_STABLECOINS':
                case 'LOCAL_SELL_STABLECOINS':
                  return orderAmountSummary(
                    getValues('recipientAmount'),
                    getValues('senderAmount'),
                    recipientCurrency,
                    senderCurrency
                  );
              }
            })()}
          </span>
          {getValues('recipientId') && (
            <>
              <br />
              {` `}to{` `}
              <span className="font-bold">{getValues('recipientId')}</span>
            </>
          )}
          {getValues('chainId') && (
            <>
              <br />
              via{` `}
              <span className="font-bold">
                {getSupportedChain(getValues('chainId'))?.name ||
                  'Unsupported chain'}
              </span>
            </>
          )}
          {` `}
          with agent <span className="font-bold">#{getValues('agentId')}</span>.
        </p>
      </Modal>
    </form>
  );
}
