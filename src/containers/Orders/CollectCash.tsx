import { CurrencyDollarIcon } from '@heroicons/react/20/solid';

import useCollectCash, { MutationProps } from '../../hooks/api/useCollectCash';
import HeaderTitle from '../../components/HeaderTitle';
import ErrorAlert from '../../components/Alert/ErrorAlert';
import useOrderDetails from '../../hooks/useOrderDetails';

type Props = {
  meetupType: MutationProps['meetupType'];
};

export default function CollectCash({ meetupType }: Props) {
  const {
    order: { orderId },
  } = useOrderDetails();

  const {
    data: order,
    mutateAsync: collectCashAsync,
    isPending,
    error,
  } = useCollectCash();

  console.log({ order });

  return (
    <>
      <HeaderTitle className="text-xl md:text-2xl">
        Collect cash on Nov 21 at Central Abu Dhabi, 5-6 pm
      </HeaderTitle>

      {error && <ErrorAlert message={error.message} />}

      <div className="flex flex-col space-y-2">
        <button
          type="button"
          onClick={() => collectCashAsync({ orderId, meetupType })}
          disabled={isPending}
          className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
        >
          {isPending && <span className="loading loading-spinner"></span>}
          <CurrencyDollarIcon className="h-6 w-6" />
          Cash collected
        </button>

        <button
          type="button"
          disabled={isPending}
          className="btn btn-outline btn-primary btn-block rounded-full text-xl font-semibold shadow-sm"
        >
          Contact sender
        </button>
      </div>
    </>
  );
}
