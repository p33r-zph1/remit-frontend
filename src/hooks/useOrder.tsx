import { useNavigate } from '@tanstack/react-router';
import { useCallback, useState } from 'react';

import { Route } from '@/src/routes/_auth/';

import { getCustomChainId } from '../configs/wagmi';
import type { Currency } from '../schema/currency';
import useCreateOrder, {
  type CrossBorderBody,
  type CrossBorderSelfBody,
  type LocalBuyBody,
  type LocalSellBody,
} from './api/useCreateOrder';
import type { OrderForm } from './useOrderForm';

export default function useOrder() {
  const navigate = useNavigate({ from: Route.fullPath });

  const {
    data: sendOrderData,
    mutateAsync: sendOrderAsync,
    isPending: isSendingOrder,
    isSuccess: isSendOrderSuccess,
    error: createOrderError,
  } = useCreateOrder();

  const [modalVisible, setModalVisible] = useState(false);
  const [executeFn, setExecuteFn] = useState<() => void>();

  const onCrossBorderCreateOrder = useCallback(
    (props: OrderForm, from: Currency, to: Currency) => {
      function getCreateOrderBody() {
        switch (props.orderType) {
          case 'CROSS_BORDER_REMITTANCE': {
            return {
              senderCurrency: from.currency,
              recipientCurrency: to.currency,
              senderAgentId: props.agentId,
              recipientId: props.recipientId,
              transferAmount: Number(props.senderAmount),
            } satisfies CrossBorderBody;
          }

          case 'CROSS_BORDER_SELF_REMITTANCE': {
            return {
              senderCurrency: from.currency,
              recipientCurrency: to.currency,
              senderAgentId: props.agentId,
              transferAmount: Number(props.senderAmount),
            } satisfies CrossBorderSelfBody;
          }

          case 'LOCAL_BUY_STABLECOINS': {
            return {
              senderCurrency: from.currency,
              token: to.currency,
              senderAgentId: props.agentId,
              chain: getCustomChainId(props.chainId),
              transferAmount: Number(props.senderAmount),
            } satisfies LocalBuyBody;
          }

          case 'LOCAL_SELL_STABLECOINS': {
            return {
              token: from.currency,
              recipientCurrency: to.currency,
              recipientAgentId: props.agentId,
              chain: getCustomChainId(props.chainId),
              transferAmount: Number(props.senderAmount),
            } satisfies LocalSellBody;
          }
        }
      }

      async function confirmSend() {
        try {
          await sendOrderAsync({
            orderType: props.orderType,
            body: getCreateOrderBody(),
          });

          setModalVisible(false);
        } catch (e: unknown) {
          setModalVisible(false);
          console.error(e);
        }
      }

      setExecuteFn(() => confirmSend);
      setModalVisible(true);
    },
    [sendOrderAsync]
  );

  const onNavigateToOrder = useCallback(() => {
    if (isSendOrderSuccess) {
      navigate({
        to: '/order/$orderId',
        params: { orderId: sendOrderData.data.orderId },
      });
    }
  }, [isSendOrderSuccess, navigate, sendOrderData?.data.orderId]);

  return {
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
  };
}
