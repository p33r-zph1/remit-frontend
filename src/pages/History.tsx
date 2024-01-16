import { Suspense } from 'react';

import TransactionSkeleton from '../components/Transaction/Skeleton';
import TransactionList from '../components/Transaction/List';

export default function TransactionHistory() {
  return (
    <div className="flex-1 w-full flex flex-col px-6 py-2 sm:max-w-3xl sm:mx-auto">
      <h1 className="text-2xl font-semibold mt-6 mb-6 md:mt-14 md:mb-12 md:text-3xl md:text-center">
        Transaction History
      </h1>

      <Suspense fallback={<TransactionSkeleton />}>
        <TransactionList />
      </Suspense>
    </div>
  );
}
