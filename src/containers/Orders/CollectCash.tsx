import { CurrencyDollarIcon } from '@heroicons/react/20/solid';

import useConfirmCash from '../../hooks/api/useConfirmCash';
import useOrderDetails from '../../hooks/useOrderDetails';

import HeaderTitle from '../../components/HeaderTitle';
import ErrorAlert from '../../components/Alert/ErrorAlert';
import { format } from 'date-fns';

export default function CollectCash() {
  const {
    order: { orderId, collectionDetails },
  } = useOrderDetails();

  const { mutateAsync: collectCashAsync, isPending, error } = useConfirmCash();

  if (!collectionDetails) throw new Error('Collection details is not present.');

  const { areaName, startDate } = collectionDetails;

  return (
    <div className="flex flex-col space-y-4">
      <HeaderTitle className="text-xl md:text-2xl">
        <span className="text-gray-400">Collect cash on </span>
        {format(startDate, 'MMMM dd, yyyy')}{' '}
        <span className="text-gray-400">at </span> {areaName}
      </HeaderTitle>

      {error && <ErrorAlert message={error.message} />}

      <div className="flex flex-col space-y-2">
        <button
          type="button"
          onClick={() => collectCashAsync({ orderId })}
          disabled={isPending}
          className="btn btn-primary btn-block rounded-full text-base font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
        >
          {isPending && <span className="loading loading-spinner"></span>}
          <CurrencyDollarIcon className="h-6 w-6" />
          Cash collected
        </button>

        <button
          type="button"
          disabled={isPending}
          className="btn btn-outline btn-primary btn-block rounded-full text-base font-semibold shadow-sm md:text-lg"
        >
          Contact sender
        </button>
      </div>
    </div>
  );
}
