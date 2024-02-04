import { Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import TransferDetails from '../containers/TransferDetails';
import Page from '../components/Page';
import QueryFallback from '../components/QueryFallback';
import LoadingRing from '../components/Spinner/LoadingRing';
import { orderQueryOptions } from '../hooks/api/useOrder';

export const Route = createFileRoute('/_auth/transfer/$orderId')({
  loader: opts =>
    opts.context.queryClient.ensureQueryData(
      orderQueryOptions({ orderId: opts.params.orderId })
    ),
  component: () => (
    <Page className="mx-auto max-w-3xl">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<LoadingRing className="flex-1" />}>
              <TransferDetails />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  ),
});
