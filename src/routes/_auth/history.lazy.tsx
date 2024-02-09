import { type ReactNode, Suspense } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import HistorySkeleton from '../../components/Skeleton/HistorySkeleton';
import HistoryList from '../../containers/HistoryList';
import QueryFallback from '../../components/Fallback/QueryFallback';
import HeaderTitle from '../../components/HeaderTitle';
import Page from '../../components/Page';

export const Route = createLazyFileRoute('/_auth/history')({
  pendingComponent: () => (
    <HistoryComponent>
      <HistorySkeleton />
    </HistoryComponent>
  ),
  component: () => (
    <HistoryComponent>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<HistorySkeleton />}>
              <HistoryList />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </HistoryComponent>
  ),
});

function HistoryComponent({ children }: { children: ReactNode }) {
  return (
    <Page className="mx-auto max-w-3xl">
      <HeaderTitle className="md:text-center">Transaction History</HeaderTitle>

      {children}
    </Page>
  );
}
