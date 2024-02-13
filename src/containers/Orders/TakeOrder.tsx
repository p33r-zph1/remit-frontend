import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import chainList, { getCustomChainId } from '../../constants/chains';
import useAcceptOrder from '../../hooks/api/useAcceptOrder';
import useRejectOrder from '../../hooks/api/useRejectOrder';
import useOrderDetails from '../../hooks/useOrderDetails';
import ErrorAlert from '../../components/Alert/ErrorAlert';
import SelectChain from '../../components/Select/SelectChain';

const takeOrderSchema = z.object({
  chainId: z.number().min(1),
});

export type TakeOrder = z.infer<typeof takeOrderSchema>;

export default function TakeOrder() {
  const { control, handleSubmit } = useForm<TakeOrder>({
    resolver: zodResolver(takeOrderSchema),
    defaultValues: {
      chainId: 0,
    },
  });

  const {
    agent: { isSender },
    order: { fees, orderId },
  } = useOrderDetails();

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

  const onSubmit: SubmitHandler<TakeOrder> = async ({ chainId }) => {
    try {
      await acceptOrderAsync({
        key: 'senderagent',
        orderId,
        body: { chain: getCustomChainId(chainId) },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <span className="text-gray-400">
          Your commission at {fees.recipientAgentCommission}%
        </span>

        <span className="text-xl font-bold md:text-2xl">~ 748.10 USDT</span>
      </div>
      {isSender && (
        <SelectChain control={control} name="chainId" list={chainList} />
      )}

      {acceptOrderError && <ErrorAlert message={acceptOrderError.message} />}
      {rejectOrderError && <ErrorAlert message={rejectOrderError.message} />}

      <div className="flex flex-col space-y-2">
        <button
          type={isSender ? 'submit' : 'button'}
          onClick={async () => {
            if (!isSender) {
              await acceptOrderAsync({
                key: 'agent',
                orderId,
              });
            }
          }}
          disabled={isAccepting || isRejecting}
          className="btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
        >
          {isAccepting && <span className="loading loading-spinner"></span>}
          Take order
        </button>

        <button
          type="button"
          onClick={() =>
            rejectOrderAsync({
              orderId,
            })
          }
          disabled={isAccepting || isRejecting}
          className="btn btn-outline btn-error btn-block rounded-full text-base font-semibold shadow-sm md:text-lg"
        >
          {isRejecting && <span className="loading loading-spinner"></span>}
          Reject order
        </button>
      </div>
    </form>
  );
}
