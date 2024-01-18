import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import AlertList from '../components/Alert/List';
import QueryFallback from '../components/QueryFallback';
import AlertSkeleton from '../components/Alert/Skeleton';
import HeaderTitle from '../components/HeaderTitle';

export default function Alerts() {
  return (
    <div className="flex w-full flex-1 flex-col px-6 py-2 sm:mx-auto sm:max-w-3xl">
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
    </div>
  );
}
