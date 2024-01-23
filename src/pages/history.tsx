import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import TransactionSkeleton from '../components/Transaction/Skeleton';
import TransactionList from '../containers/HistoryList';
import QueryFallback from '../components/QueryFallback';
import HeaderTitle from '../components/HeaderTitle';
import Page from '../components/Page';

export default function History() {
  return (
    <Page className="mx-auto max-w-3xl">
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
    </Page>
  );
}
