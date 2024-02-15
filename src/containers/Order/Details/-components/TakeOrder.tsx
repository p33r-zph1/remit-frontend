import { zodResolver } from '@hookform/resolvers/zod';
import { memo } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { numericFormatter } from 'react-number-format';
import { z } from 'zod';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import SelectChain from '@/src/components/Select/SelectChain';
import wagmi, { getCustomChainId } from '@/src/configs/wagmi';
import useAcceptOrder from '@/src/hooks/api/useAcceptOrder';
import useRejectOrder from '@/src/hooks/api/useRejectOrder';
import useOrderDetails from '@/src/hooks/useOrderDetails';

const takeOrderSchema = z.object({
  chainId: z.number().min(1),
});

export type TakeOrderSchema = z.infer<typeof takeOrderSchema>;

export default memo(function TakeOrder() {
  const { control, handleSubmit } = useForm<TakeOrderSchema>({
    resolver: zodResolver(takeOrderSchema),
    defaultValues: {
      chainId: 0,
    },
  });

  const {
    agent: { isSender, isRecipient },
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

  const onSubmit: SubmitHandler<TakeOrderSchema> = async ({ chainId }) => {
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
      {/* TODO: refactor code duplication */}
      {isSender && (
        <div className="flex flex-col space-y-1">
          <span className="text-gray-400">
            Your commission at {fees.senderAgent.commission}%
          </span>

          <span className="text-xl font-bold md:text-2xl">
            ~
            {numericFormatter(
              `${fees.senderAgent.amount} ${fees.senderAgent.token}`,
              {
                thousandSeparator: ', ',
              }
            )}
          </span>
        </div>
      )}

      {isRecipient && fees.recipientAgent && (
        <div className="flex flex-col space-y-1">
          <span className="text-gray-400">
            Your commission at {fees.recipientAgent.commission}%
          </span>

          <span className="text-xl font-bold md:text-2xl">
            ~
            {numericFormatter(
              `${fees.recipientAgent.amount} ${fees.recipientAgent.token}`,
              {
                thousandSeparator: ', ',
              }
            )}
          </span>
        </div>
      )}

      {isSender && (
        <SelectChain control={control} name="chainId" list={wagmi.chains} />
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
});
