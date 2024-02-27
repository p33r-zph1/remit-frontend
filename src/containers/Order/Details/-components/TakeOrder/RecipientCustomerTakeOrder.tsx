import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useMemo } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import HeaderTitle from '@/src/components/HeaderTitle';
import Modal from '@/src/components/Modal';
import SelectAgent from '@/src/components/Select/SelectAgent';
import useGetAgents from '@/src/hooks/api/useGetAgents';
import useOrderDetails from '@/src/hooks/useOrderDetails';
import useTakeOrder from '@/src/hooks/useTakeOrder';
import { getTransferInfo } from '@/src/schema/order/transfer-details';
import { formatTranferInfo } from '@/src/schema/order/transfer-info';

const takeOrderFormSchema = z.object({
  agentId: z
    .string()
    .min(1)
    .refine(value => value !== 'default', {
      message: 'Please select an agent',
    }),
});

type TakeOrderForm = z.infer<typeof takeOrderFormSchema>;

export default memo(function RecipientCustomerTakeOrder() {
  const { order } = useOrderDetails();

  const { orderType, orderId, transferDetails } = order;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TakeOrderForm>({
    resolver: zodResolver(takeOrderFormSchema),
    defaultValues: {
      agentId: 'default',
    },
  });

  const { data: agents } = useGetAgents({
    isoCode: getTransferInfo(transferDetails).countryIsoCode,
  });

  const {
    // callbacks
    executeFn,
    onCustomerAcceptOrder: onAcceptOrder,
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

  const onSubmit: SubmitHandler<TakeOrderForm> = ({ agentId }) => {
    onAcceptOrder(agentId);
  };

  const agentId = watch('agentId');

  const selectedAgent = useMemo(
    () => agents.find(a => a.agentId === agentId),
    [agentId, agents]
  );

  if (order.orderType !== 'CROSS_BORDER_REMITTANCE') return; // TODO: handle other `orderType`

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HeaderTitle className="text-xl md:text-2xl">Accept order</HeaderTitle>

      <div className="flex-flex-col items-center justify-center space-y-4">
        <SelectAgent
          list={agents}
          error={errors.agentId}
          disabled={isSubmitting || isRejecting}
          {...register('agentId')}
        />

        {acceptOrderError && <ErrorAlert message={acceptOrderError.message} />}

        {rejectOrderError && <ErrorAlert message={rejectOrderError.message} />}

        <div className="flex flex-col space-y-2">
          <button
            type="submit"
            disabled={isSubmitting || isRejecting}
            className="btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
          >
            Select agent
          </button>

          <button
            type="button"
            onClick={onRejectOrder}
            disabled={isSubmitting || isRejecting}
            className="btn btn-outline btn-error btn-block rounded-full text-base font-semibold shadow-sm md:text-lg"
          >
            Reject transfer
          </button>
        </div>
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
          You&apos;re about to {modalState.state} an order amounting of {` `}
          <span className="font-bold">
            ~ {formatTranferInfo(getTransferInfo(transferDetails))}
          </span>
          {modalState.state === 'accept' && (
            <>
              <br />
              with agent <span className="font-bold">#{agentId}</span> commision
              of{' '}
              <span className="font-bold">
                {selectedAgent?.commission || '?'}%
              </span>
            </>
          )}
          <br />
          <br />
        </p>
      </Modal>
    </form>
  );
});
