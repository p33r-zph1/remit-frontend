import { Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import HistorySkeleton from '../components/Skeleton/HistorySkeleton';
import HistoryList from '../containers/HistoryList';
import QueryFallback from '../components/QueryFallback';
import HeaderTitle from '../components/HeaderTitle';
import Page from '../components/Page';

export const Route = createFileRoute('/_auth/history')({
  component: () => (
    <Page className="mx-auto max-w-3xl">
      <HeaderTitle>Transaction History</HeaderTitle>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<HistorySkeleton />}>
              <HistoryList />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  ),
});
