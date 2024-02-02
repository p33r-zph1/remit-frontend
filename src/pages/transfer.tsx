import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import TransferDetails from '../containers/TransferDetails';
import Page from '../components/Page';
import QueryFallback from '../components/QueryFallback';

export default function Transfer() {
  return (
    <Page className="mx-auto max-w-3xl">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense
              fallback={
                <div className="flex flex-1 items-center justify-center">
                  <span className="loading loading-ring loading-lg"></span>
                </div>
              }
            >
              <TransferDetails />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  );
}
