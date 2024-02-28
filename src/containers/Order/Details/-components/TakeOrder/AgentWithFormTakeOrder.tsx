import { zodResolver } from '@hookform/resolvers/zod';
import { memo } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import Modal from '@/src/components/Modal';
import SelectChain from '@/src/components/Select/SelectChain';
import wagmi from '@/src/configs/wagmi';
import useTakeOrder from '@/src/hooks/useTakeOrder';
import { type Commission, formatCommissionDetails } from '@/src/schema/fees';
import type { OrderType } from '@/src/schema/order';

const takeOrderSchema = z.object({
  chainId: z.number().min(1, { message: 'Please select a chain' }),
});

export type TakeOrderSchema = z.infer<typeof takeOrderSchema>;

type Props = {
  orderType: OrderType;
  orderId: string;
  commission: Commission | undefined;
};

export default memo(function AgentWithFormTakeOrder({
  orderType,
  orderId,
  commission,
}: Props) {
  const { control, handleSubmit } = useForm<TakeOrderSchema>({
    resolver: zodResolver(takeOrderSchema),
    defaultValues: {
      chainId: 0,
    },
  });

  const {
    // callbacks
    executeFn,
    onSenderAgentAcceptOrder: onAcceptOrder,
    onRejectOrder,

    // state
    modalState,
    setModalState,
    isAccepting,
    isRejecting,

    // errors
    acceptOrderError,
    rejectOrderError,
  } = useTakeOrder({ orderType, orderId });

  const onSubmit: SubmitHandler<TakeOrderSchema> = ({ chainId }) => {
    onAcceptOrder(chainId);
  };

  if (!commission) {
    throw new Error('Agent commision cannot be missing.');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <span className="text-gray-400">
          Your commission at {commission.commission}%
        </span>

        <span className="text-xl font-bold md:text-2xl">
          {formatCommissionDetails(commission)}
        </span>
      </div>

      <SelectChain control={control} name="chainId" list={wagmi.chains} />

      {acceptOrderError && <ErrorAlert message={acceptOrderError.message} />}
      {rejectOrderError && <ErrorAlert message={rejectOrderError.message} />}

      <div className="flex flex-col space-y-2">
        <button
          type="submit"
          disabled={isAccepting || isRejecting}
          className="btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
        >
          Take order
        </button>

        <button
          type="button"
          onClick={onRejectOrder}
          disabled={isAccepting || isRejecting}
          className="btn btn-outline btn-error btn-block rounded-full text-base font-semibold shadow-sm md:text-lg"
        >
          Reject order
        </button>
      </div>

      <Modal
        open={modalState.visible}
        isLoading={isAccepting || isRejecting}
        onClose={() =>
          setModalState(prevState => ({ ...prevState, visible: false }))
        }
        type="action"
        actions={{
          confirm: {
            label: modalState.state || '?',
            action: () => executeFn?.(),
          },
          cancel: {
            label: 'Cancel',
          },
        }}
        slideFrom="top"
        title={`Confirm ${modalState.state} order`}
        size="medium"
      >
        <p className="text-balance text-slate-500">
          You&apos;re about to {modalState.state} an order with commission
          <br />
          <span className="font-bold">
            {formatCommissionDetails(commission)} ({commission.commission}%)
          </span>
        </p>
      </Modal>
    </form>
  );
});
