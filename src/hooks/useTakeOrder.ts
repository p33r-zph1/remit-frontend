import { useCallback, useState } from 'react';

import useAcceptOrder from '@/src/hooks/api/useAcceptOrder';
import useRejectOrder from '@/src/hooks/api/useRejectOrder';

import { getCustomChainId } from '../configs/wagmi';

type Props = {
  orderId: string;
};

export default function useTakeOrder({ orderId }: Props) {
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
    [acceptOrderAsync, orderId]
  );

  const onSenderAgentAcceptOrder = useCallback(
    (chainId: number) => {
      async function acceptOrder() {
        try {
          await acceptOrderAsync({
            type: 'senderagent',
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
    [acceptOrderAsync, orderId]
  );

  const onRecipientAgentAcceptOrder = useCallback(() => {
    async function acceptOrder() {
      try {
        await acceptOrderAsync({
          type: 'recipientagent',
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
  }, [acceptOrderAsync, orderId]);

  const onRejectOrder = useCallback(() => {
    async function rejectOrder() {
      try {
        await rejectOrderAsync({
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
  }, [orderId, rejectOrderAsync]);

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
