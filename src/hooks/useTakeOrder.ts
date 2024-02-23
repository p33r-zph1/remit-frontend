import { useCallback, useState } from 'react';

import { getCustomChainId } from '../configs/wagmi';
import type { OrderType } from '../schema/order';
import useAcceptOrder from './api/useAcceptOrder';
import useRejectOrder from './api/useRejectOrder';

type Props = {
  orderType: OrderType;
  orderId: string;
};

export default function useTakeOrder({ orderType, orderId }: Props) {
  const {
    mutateAsync: acceptOrderAsync,
    isPending: isAccepting,
    error: acceptOrderError,
  } = useAcceptOrder();

  const {
    mutateAsync: rejectOrderAsync,
    isPending: isRejecting,
    error: rejectOrderError,
  } = useRejectOrder();

  const [modalState, setModalState] = useState<{
    state?: 'accept' | 'reject';
    visible: boolean;
  }>({ visible: false });

  const [executeFn, setExecuteFn] = useState<() => void>();

  const onCustomerAcceptOrder = useCallback(
    (recipientAgentId: string) => {
      async function acceptOrder() {
        try {
          await acceptOrderAsync({
            type: 'customer',
            orderType,
            orderId,
            body: { recipientAgentId },
          });

          setModalState(prevState => ({ ...prevState, visible: false }));
        } catch (err) {
          setModalState(prevState => ({ ...prevState, visible: false }));
          console.error(err);
        }
      }

      setExecuteFn(() => acceptOrder);
      setModalState({ state: 'accept', visible: true });
    },
    [acceptOrderAsync, orderId, orderType]
  );

  const onSenderAgentAcceptOrder = useCallback(
    (chainId: number) => {
      async function acceptOrder() {
        try {
          await acceptOrderAsync({
            type: 'senderagent',
            orderType,
            orderId,
            body: { chain: getCustomChainId(chainId) },
          });

          setModalState(prevState => ({ ...prevState, visible: false }));
        } catch (err) {
          setModalState(prevState => ({ ...prevState, visible: false }));
          console.error(err);
        }
      }

      setExecuteFn(() => acceptOrder);
      setModalState({ state: 'accept', visible: true });
    },
    [acceptOrderAsync, orderId, orderType]
  );

  const onRecipientAgentAcceptOrder = useCallback(() => {
    async function acceptOrder() {
      try {
        await acceptOrderAsync({
          type: 'recipientagent',
          orderType,
          orderId,
        });

        setModalState(prevState => ({ ...prevState, visible: false }));
      } catch (err) {
        setModalState(prevState => ({ ...prevState, visible: false }));
        console.error(err);
      }
    }

    setExecuteFn(() => acceptOrder);
    setModalState({ state: 'accept', visible: true });
  }, [acceptOrderAsync, orderId, orderType]);

  const onRejectOrder = useCallback(() => {
    async function rejectOrder() {
      try {
        await rejectOrderAsync({
          orderType,
          orderId,
        });

        setModalState(prevState => ({ ...prevState, visible: false }));
      } catch (err) {
        setModalState(prevState => ({ ...prevState, visible: false }));
        console.error(err);
      }
    }
    setExecuteFn(() => rejectOrder);
    setModalState({ state: 'reject', visible: true });
  }, [orderId, orderType, rejectOrderAsync]);

  return {
    // callbacks
    executeFn,
    onCustomerAcceptOrder,
    onSenderAgentAcceptOrder,
    onRecipientAgentAcceptOrder,
    onRejectOrder,

    // state
    modalState,
    setModalState,
    isAccepting,
    isRejecting,

    // errors
    acceptOrderError,
    rejectOrderError,
  };
}
