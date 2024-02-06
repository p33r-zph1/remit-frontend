import ErrorAlert from '../../components/Alert/ErrorAlert';
import useAcceptOrder from '../../hooks/api/useAcceptOrder';
import useRejectOrder from '../../hooks/api/useRejectOrder';
import useOrderDetails from '../../hooks/useOrderDetails';

export default function TakeOrder() {
  const {
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

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-1">
        <span className="text-gray-400">
          Your commission at {fees.recipientAgentCommission}%
        </span>

        <span className="text-xl font-bold md:text-2xl">~ 748.10 USDT</span>
      </div>

      {acceptOrderError && <ErrorAlert message={acceptOrderError.message} />}
      {rejectOrderError && <ErrorAlert message={rejectOrderError.message} />}

      <div className="flex flex-col space-y-2">
        <button
          type="button"
          onClick={() =>
            acceptOrderAsync({
              key: 'agent',
              orderId,
            })
          }
          disabled={isAccepting || isRejecting}
          className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
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
          className="btn btn-outline btn-error btn-block rounded-full text-xl font-semibold shadow-sm"
        >
          {isRejecting && <span className="loading loading-spinner"></span>}
          Reject order
        </button>
      </div>
    </div>
  );
}
