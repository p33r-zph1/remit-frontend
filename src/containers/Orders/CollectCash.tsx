import { CurrencyDollarIcon } from '@heroicons/react/20/solid';

import HeaderTitle from '../../components/HeaderTitle';

export default function CollectCash() {
  return (
    <>
      <HeaderTitle className="text-xl md:text-2xl">
        Collect cash on Nov 21 at Central Abu Dhabi, 5-6 pm
      </HeaderTitle>

      <div className="flex flex-col space-y-2">
        <button
          type="button"
          className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
        >
          <CurrencyDollarIcon className="h-6 w-6" />
          Cash collected
        </button>

        <button
          type="button"
          className="btn btn-outline btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
        >
          Contact sender
        </button>
      </div>
    </>
  );
}
