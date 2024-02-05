import { Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import OrderDetails from '../containers/OrderDetails';
import Page from '../components/Page';
import QueryFallback from '../components/Fallback/QueryFallback';
import LoadingRing from '../components/Spinner/LoadingRing';
import { orderQueryOptions } from '../hooks/api/useOrder';

export const Route = createFileRoute('/_auth/transfer/$orderId')({
  loader: opts =>
    opts.context.queryClient.ensureQueryData(
      orderQueryOptions({ orderId: opts.params.orderId })
    ),
  wrapInSuspense: true,
  component: () => (
    <Page className="mx-auto max-w-3xl">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<LoadingRing className="flex-1" />}>
              <OrderDetails />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  ),
});
