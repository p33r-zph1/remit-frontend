import { z } from 'zod';
import HeaderTitle from '../components/HeaderTitle';
import SelectAgent from '../components/Select/SelectAgent';
import useAcceptOrder from '../hooks/api/useAcceptOrder';
import useAgents from '../hooks/api/useAgents';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import useRejectOrder from '../hooks/api/useRejectOrder';

const formSchema = z.object({
  agentId: z
    .string()
    .min(1)
    .refine(value => value !== 'default', {
      message: 'Please select an agent',
    }),
});

type Inputs = z.infer<typeof formSchema>;

export default function AcceptOrderForm({ orderId }: { orderId: string }) {
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

  const { data: agents } = useAgents('in');

  const { mutateAsync: acceptOrderAsync } = useAcceptOrder();
  const { mutateAsync: rejectOrderAsync, isPending: isRejecting } =
    useRejectOrder();

  const onSubmit: SubmitHandler<Inputs> = async ({ agentId }) => {
    try {
      const { data } = await acceptOrderAsync({
        data: { recipientAgentId: agentId },
        orderId,
      });

      console.log({ data });
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

        <button
          type="submit"
          className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
          disabled={isSubmitting || isRejecting}
        >
          {isSubmitting && <span className="loading loading-spinner"></span>}
          Select agent
        </button>

        <button
          type="button"
          onClick={() => rejectOrderAsync({ orderId })}
          className="btn btn-outline btn-error btn-block rounded-full text-xl font-semibold shadow-sm"
          disabled={isSubmitting || isRejecting}
        >
          {isRejecting && <span className="loading loading-spinner"></span>}
          Reject transfer
        </button>
      </div>
    </form>
  );
}
