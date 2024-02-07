import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorAlert from '../../components/Alert/ErrorAlert';
import SelectChain from '../../components/Select/SelectChain';
import useAcceptOrder from '../../hooks/api/useAcceptOrder';
import useRejectOrder from '../../hooks/api/useRejectOrder';
import useOrderDetails from '../../hooks/useOrderDetails';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// TODO: use wagmi
const chain = [
  { name: 'BNBChain', id: 'bnb' },
  { name: 'Polygon', id: 'matic' },
  { name: 'Ethereum', id: 'eth' },
];

const formSchema = z.object({
  chain: z.string().min(1),
});

type Inputs = z.infer<typeof formSchema>;

export default function TakeOrder() {
  const { control, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chain: '',
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

  const onSubmit: SubmitHandler<Inputs> = ({ chain }) => {
    if (isSender) {
      return acceptOrderAsync({
        key: 'senderagent',
        orderId,
        body: { chain },
      });
    }

    acceptOrderAsync({
      key: 'agent',
      orderId,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <span className="text-gray-400">
          Your commission at {fees.recipientAgentCommission}%
        </span>

        <span className="text-xl font-bold md:text-2xl">~ 748.10 USDT</span>
      </div>
      {isSender && <SelectChain control={control} name="chain" list={chain} />}

      {acceptOrderError && <ErrorAlert message={acceptOrderError.message} />}
      {rejectOrderError && <ErrorAlert message={rejectOrderError.message} />}
      <div className="flex flex-col space-y-2">
        <button
          type="submit"
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
