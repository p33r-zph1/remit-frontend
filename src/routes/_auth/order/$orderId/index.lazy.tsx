import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import QueryFallback from '@/src/components/Fallback/QueryFallback';
import HeroNotFound from '@/src/components/Hero/HeroNotFound';
import Page from '@/src/components/Page';
import LoadingRing from '@/src/components/Spinner/LoadingRing';
import AgentOrderDetails from '@/src/containers/Order/Details/AgentOrderDetails';
import CustomerOrderDetails from '@/src/containers/Order/Details/CustomerOrderDetails';
import OrderDetailsProvider from '@/src/contexts/order-details';
import useAuth from '@/src/hooks/useAuth';

export const Route = createLazyFileRoute('/_auth/order/$orderId/')({
  component: () => (
    <Page className="mx-auto max-w-3xl">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<LoadingRing className="flex-1" />}>
              <OrderDetailsProvider>
                <OrderDetailsComponent />
              </OrderDetailsProvider>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  ),
});

function OrderDetailsComponent() {
  const { hasGroup } = useAuth();

  if (hasGroup('customer')) {
    return <CustomerOrderDetails />;
  }

  if (hasGroup('agent')) {
    return <AgentOrderDetails />;
  }

  return <HeroNotFound className="bg-white" />;
}
