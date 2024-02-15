import { zodResolver } from '@hookform/resolvers/zod';
import { memo } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import HeaderTitle from '@/src/components/HeaderTitle';
import SelectAgent from '@/src/components/Select/SelectAgent';
import useAcceptOrder from '@/src/hooks/api/useAcceptOrder';
import useAgents from '@/src/hooks/api/useAgents';
import useRejectOrder from '@/src/hooks/api/useRejectOrder';
import useOrderDetails from '@/src/hooks/useOrderDetails';

const formSchema = z.object({
  agentId: z
    .string()
    .min(1)
    .refine(value => value !== 'default', {
      message: 'Please select an agent',
    }),
});

type Inputs = z.infer<typeof formSchema>;

export default memo(function AcceptOrder() {
  const {
    order: { orderId, transferDetails },
  } = useOrderDetails();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentId: 'default',
    },
  });

  const { data: agents } = useAgents(transferDetails.recipient.countryIsoCode);

  const { mutateAsync: acceptOrderAsync, error: acceptOrderError } =
    useAcceptOrder();

  const {
    mutateAsync: rejectOrderAsync,
    isPending: isRejecting,
    error: rejectOrderError,
  } = useRejectOrder();

  const onSubmit: SubmitHandler<Inputs> = async ({ agentId }) => {
    try {
      await acceptOrderAsync({
        key: 'customer',
        orderId,
        body: { recipientAgentId: agentId },
      });
    } catch (e: unknown) {
      console.error(e);
    }
  };

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

        <button
          type="submit"
          className="btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
          disabled={isSubmitting || isRejecting}
        >
          {isSubmitting && <span className="loading loading-spinner"></span>}
          Select agent
        </button>

        <button
          type="button"
          onClick={() => rejectOrderAsync({ orderId })}
          className="btn btn-outline btn-error btn-block rounded-full text-base font-semibold shadow-sm md:text-lg"
          disabled={isSubmitting || isRejecting}
        >
          {isRejecting && <span className="loading loading-spinner"></span>}
          Reject transfer
        </button>
      </div>
    </form>
  );
});
