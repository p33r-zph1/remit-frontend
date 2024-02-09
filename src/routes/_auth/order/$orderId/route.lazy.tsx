import { Suspense } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import useAuth from '../../../../hooks/useAuth';
import useOrderDetails from '../../../../hooks/useOrderDetails';
import CustomerOrderDetails from '../../../../containers/Orders/Customer/CustomerOrderDetails';
import AgentOrderDetails from '../../../../containers/Orders/Agent/AgentOrderDetails';
import ShowQrCode from '../../../../containers/Orders/QrCode/ShowQrCode';
import { OrderDetailsProvider } from '../../../../contexts/order-details';

import Page from '../../../../components/Page';
import QueryFallback from '../../../../components/Fallback/QueryFallback';
import LoadingRing from '../../../../components/Spinner/LoadingRing';
import HeroNotFound from '../../../../components/Hero/HeroNotFound';

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
