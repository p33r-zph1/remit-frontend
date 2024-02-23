import { useNavigate } from '@tanstack/react-router';
import { useCallback, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { numericFormatter } from 'react-number-format';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import CurrencyInput from '@/src/components/Input/CurrencyInput';
import RecipientInput from '@/src/components/Input/RecipientInput';
import Modal from '@/src/components/Modal';
import SelectCurrency from '@/src/components/Select/SelectCurrency';
import useCreateOrder from '@/src/hooks/api/useCreateOrder';
import useSendMoney, { type SendMoney } from '@/src/hooks/useSendMoney';
import { Route } from '@/src/routes/_auth/';

import OrderType from './OrderType';
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

    // callback function for calculating the `recipientAmount`
    conversionHandler,

    // list of exchange currencies
    supportedCurrencies,

    // agents list
    agents,

    // hook form props
    formProps: {
      control,
      handleSubmit,
      getValues,
      reset,
      formState: { isSubmitting, errors },
    },
  } = useSendMoney();

  console.log(errors);

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

    const str = `${sendAmount} ${senderCurrency.currency} (${recipientAmount} ${recipientCurrency.currency})`;

    return numericFormatter(str, { thousandSeparator: ',' });
  }, [getValues, recipientCurrency.currency, senderCurrency.currency]);

  const onSubmit: SubmitHandler<SendMoney> = ({
    senderAmount,
    recipientId,
    agentId,
  }) => {
    if (getValues('orderType') !== 'CROSS_BORDER_REMITTANCE')
      return alert('submitted!'); // TODO: handle other orderTypes

    async function confirmSend() {
      try {
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

        reset();
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

      <OrderType name="orderType" control={control}>
        {orderType => (
          <div>
            {(() => {
              switch (orderType) {
                case 'CROSS_BORDER_REMITTANCE':
                  return (
                    <RecipientInput name="recipientId" control={control} />
                  );

                default:
                  return null;
              }
            })()}

            <div className="divider my-8"></div>

            <CurrencyInput
              label="You send"
              name="senderAmount"
              control={control}
              onValueChange={conversionHandler}
            >
              <SelectCurrency
                selected={senderCurrency}
                list={supportedCurrencies}
                onChange={newCurrency =>
                  setSenderCurrency(prevCurrency => {
                    if (newCurrency.currency === recipientCurrency.currency) {
                      setRecipientCurrency(prevCurrency); // swaps currency
                    }

                    return newCurrency;
                  })
                }
                disabled={isSubmitting}
              />
            </CurrencyInput>

            <SendDetails name="agentId" control={control} list={agents} />

            <CurrencyInput
              label="Recipient will get (estimate)"
              name="recipientAmount"
              control={control}
              readOnly
            >
              <SelectCurrency
                selected={recipientCurrency}
                list={supportedCurrencies}
                onChange={newCurrency =>
                  setRecipientCurrency(prevCurrency => {
                    if (newCurrency.currency === senderCurrency.currency) {
                      setSenderCurrency(prevCurrency); // swaps currency
                    }

                    return newCurrency;
                  })
                }
                disabled={isSubmitting}
              />
            </CurrencyInput>
          </div>
        )}
      </OrderType>

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
