import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { type ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import QueryFallback from '@/src/components/Fallback/QueryFallback';
import HeaderTitle from '@/src/components/HeaderTitle';
import Page from '@/src/components/Page';
import HistorySkeleton from '@/src/components/Skeleton/HistorySkeleton';
import PaginatedOrderList from '@/src/containers/Order/PaginatedOrderList';

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
              <PaginatedOrderList pageSize={10} />
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
