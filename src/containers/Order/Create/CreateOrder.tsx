import type { SubmitHandler } from 'react-hook-form';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import EmptyProfile from '@/src/components/Empty/EmptyProfile';
import RecipientInput from '@/src/components/Input/RecipientInput';
import Modal from '@/src/components/Modal';
import SelectChain from '@/src/components/Select/SelectChain';
import SelectOrderType from '@/src/components/Select/SelectOrderType';
import wagmi, { getSupportedChain } from '@/src/configs/wagmi';
import useGetCustomer from '@/src/hooks/api/useGetCustomer';
import useOrder from '@/src/hooks/useOrder';
import useOrderForm, { type OrderForm } from '@/src/hooks/useOrderForm';
import { type Currency, formatCurrencyAmount } from '@/src/schema/currency';
import type { OrderType } from '@/src/schema/order';

import CurrencyForm from './-components/CurrencyForm';

// let renderCount = 0;

type Props = {
  customerId: string;
};

export default function CreateOrder({ customerId }: Props) {
  const {
    // currency dropdown controlled state
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,

    // callback function for calculating the `recipientAmount`
    conversionHandler,

    // list of currencies
    fiatCurrencies,
    tokenCurrencies,

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
    onNavigateToOrder,

    // state
    modalVisible,
    setModalVisible,
    isSendingOrder,

    // error
    createOrderError,
  } = useOrder();

  const { data: customer } = useGetCustomer({ customerId });

  const onSubmit: SubmitHandler<OrderForm> = data => {
    if (!fromCurrency?.currency) {
      setError('fromAmount', {
        message: 'Currency error',
      });

      setModalVisible(false);
      return;
    }

    if (!toCurrency?.currency) {
      setError('toAmount', {
        message: 'Currency error',
      });

      setModalVisible(false);
      return;
    }

    onCrossBorderCreateOrder(data, fromCurrency, toCurrency);
  };

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
                  from={fromCurrency}
                  setFromCurrency={setFromCurrency}
                  fromCurrencies={fiatCurrencies}
                  to={toCurrency}
                  setToCurrency={setToCurrency}
                  toCurrencies={fiatCurrencies}
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
                  from={fromCurrency}
                  setFromCurrency={setFromCurrency}
                  fromCurrencies={tokenCurrencies}
                  to={toCurrency}
                  setToCurrency={setToCurrency}
                  toCurrencies={fiatCurrencies}
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
                  from={fromCurrency}
                  setFromCurrency={setFromCurrency}
                  fromCurrencies={fiatCurrencies}
                  to={toCurrency}
                  setToCurrency={setToCurrency}
                  toCurrencies={tokenCurrencies}
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
        disabled={isSubmitting || isSendingOrder || !customer.walletAddress}
      >
        {getOrderLabel(getValues('orderType'))}
      </button>

      {!customer.walletAddress && <EmptyProfile />}

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
        title={`Confirm ${getOrderLabel(getValues('orderType'))}`}
        size="medium"
      >
        <p className="text-balance text-slate-500">
          You&apos;re about to {` `}
          {getOrderMessage(getValues('orderType'))}{' '}
          <span className="font-bold">
            {getOrderSummary(
              getValues('orderType'),
              getValues('fromAmount'),
              getValues('toAmount'),
              fromCurrency,
              toCurrency
            )}
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

function getOrderLabel(orderType: OrderType) {
  switch (orderType) {
    case 'CROSS_BORDER_REMITTANCE':
    case 'CROSS_BORDER_SELF_REMITTANCE':
      return 'Send money';

    case 'LOCAL_BUY_STABLECOINS':
      return 'Buy stablecoins';

    case 'LOCAL_SELL_STABLECOINS':
      return 'Sell stablecoins';
  }
}

function getOrderMessage(orderType: OrderType) {
  switch (orderType) {
    case 'CROSS_BORDER_REMITTANCE':
    case 'CROSS_BORDER_SELF_REMITTANCE':
      return 'send';

    case 'LOCAL_BUY_STABLECOINS':
      return 'buy';

    case 'LOCAL_SELL_STABLECOINS':
      return 'sell';
  }
}

function getOrderSummary(
  orderType: OrderType,
  senderAmount: string,
  recipientAmount: string,
  senderCurrency: Currency | undefined,
  recipientCurrency: Currency | undefined
) {
  if (!senderCurrency || !recipientCurrency) return '?';

  switch (orderType) {
    case 'CROSS_BORDER_REMITTANCE':
    case 'CROSS_BORDER_SELF_REMITTANCE':
      return formatCurrencyAmount(
        senderAmount,
        recipientAmount,
        senderCurrency,
        recipientCurrency
      );

    case 'LOCAL_BUY_STABLECOINS':
    case 'LOCAL_SELL_STABLECOINS':
      return formatCurrencyAmount(
        recipientAmount,
        senderAmount,
        recipientCurrency,
        senderCurrency
      );
  }
}
