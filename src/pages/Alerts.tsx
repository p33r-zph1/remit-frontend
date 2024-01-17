import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import AlertList from '../components/Alert/List';
import QueryFallback from '../components/QueryFallback';
import AlertSkeleton from '../components/Alert/Skeleton';

export default function Alerts() {
  return (
    <div className="flex-1 w-full flex flex-col px-6 py-2 sm:max-w-3xl sm:mx-auto">
      <h1 className="text-2xl font-semibold mt-6 mb-6 md:mt-14 md:mb-6 md:text-3xl md:text-center">
        Alerts
      </h1>

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
