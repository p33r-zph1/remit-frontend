import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import Page from '../components/Page';
import AlertList from '../containers/AlertList';
import QueryFallback from '../components/QueryFallback';
import AlertSkeleton from '../components/Alert/Skeleton';
import HeaderTitle from '../components/HeaderTitle';

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
