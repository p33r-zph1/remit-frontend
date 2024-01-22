import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import AlertList from '../components/Alert/List';
import QueryFallback from '../components/QueryFallback';
import AlertSkeleton from '../components/Alert/Skeleton';
import HeaderTitle from '../components/HeaderTitle';
import Page from '../components/Page';

export default function Alerts() {
  return (
    <Page className="mx-auto max-w-3xl">
      <HeaderTitle>Alerts</HeaderTitle>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<AlertSkeleton />}>
              <AlertList />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  );
}
