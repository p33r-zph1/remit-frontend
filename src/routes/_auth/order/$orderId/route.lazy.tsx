import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import QueryFallback from '@/src/components/Fallback/QueryFallback';
import HeroNotFound from '@/src/components/Hero/HeroNotFound';
import Page from '@/src/components/Page';
import LoadingRing from '@/src/components/Spinner/LoadingRing';
import AgentOrderDetails from '@/src/containers/Orders/Agent/AgentOrderDetails';
import CustomerOrderDetails from '@/src/containers/Orders/Customer/CustomerOrderDetails';
import ShowQrCode from '@/src/containers/Orders/QrCode/ShowQrCode';
import { OrderDetailsProvider } from '@/src/contexts/order-details';
import useAuth from '@/src/hooks/useAuth';
import useOrderDetails from '@/src/hooks/useOrderDetails';

export const Route = createLazyFileRoute('/_auth/order/$orderId')({
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
  const {
    customer: { isRecipient: isRecipientCustomer },
  } = useOrderDetails();
  const { qrCode } = Route.useSearch();

  if (isRecipientCustomer && qrCode) {
    return <ShowQrCode qrCode={qrCode} />;
  }

  if (hasGroup('customer')) {
    return <CustomerOrderDetails />;
  }

  if (hasGroup('agent')) {
    return <AgentOrderDetails />;
  }

  return <HeroNotFound className="bg-white" />;
}
