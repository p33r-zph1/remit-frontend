import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import TransactionSkeleton from '../components/Transaction/Skeleton';
import TransactionList from '../components/Transaction/List';
import QueryFallback from '../components/QueryFallback';
import HeaderTitle from '../components/HeaderTitle';

export default function History() {
  return (
    <div className="flex-1 w-full flex flex-col px-6 py-2 sm:max-w-3xl sm:mx-auto">
      <HeaderTitle>Transaction History</HeaderTitle>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<TransactionSkeleton />}>
              <TransactionList />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </div>
  );
}
