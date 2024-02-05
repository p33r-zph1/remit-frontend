import { Suspense } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import QueryFallback from '../../../../components/Fallback/QueryFallback';
import Page from '../../../../components/Page';
import LoadingRing from '../../../../components/Spinner/LoadingRing';
import OrderDetails from '../../../../containers/OrderDetails';

export const Route = createLazyFileRoute('/_auth/transfer/$orderId')({
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
