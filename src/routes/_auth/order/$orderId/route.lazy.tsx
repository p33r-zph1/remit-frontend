import { Suspense } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import useAuth from '../../../../hooks/useAuth';
import CustomerOrderDetails from '../../../../containers/Orders/Customer/OrderDetails';
import AgentOrderDetails from '../../../../containers/Orders/Agent/OrderDetails';

import Page from '../../../../components/Page';
import QueryFallback from '../../../../components/Fallback/QueryFallback';
import LoadingRing from '../../../../components/Spinner/LoadingRing';
import { OrderDetailsProvider } from '../../../../contexts/order-details';

export const Route = createLazyFileRoute('/_auth/order/$orderId')({
  component: HistoryComponent,
});

function HistoryComponent() {
  const { hasGroup } = useAuth();

  return (
    <Page className="mx-auto max-w-3xl">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<LoadingRing className="flex-1" />}>
              <OrderDetailsProvider>
                {hasGroup('customer') && <CustomerOrderDetails />}
                {hasGroup('agent') && <AgentOrderDetails />}
              </OrderDetailsProvider>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  );
}
