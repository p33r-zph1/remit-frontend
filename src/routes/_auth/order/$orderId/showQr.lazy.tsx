import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import QueryFallback from '@/src/components/Fallback/QueryFallback';
import HeroAccessDenied from '@/src/components/Hero/HeroAccessDenied';
import HeroNotFound from '@/src/components/Hero/HeroNotFound';
import Page from '@/src/components/Page';
import LoadingRing from '@/src/components/Spinner/LoadingRing';
import ShowQrCode from '@/src/containers/Order/QrCode/ShowQrCode';
import OrderDetailsProvider from '@/src/contexts/order-details';
import useOrderDetails from '@/src/hooks/useOrderDetails';

export const Route = createLazyFileRoute('/_auth/order/$orderId/showQr')({
  component: () => (
    <Page className="mx-auto max-w-3xl">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<LoadingRing className="flex-1" />}>
              <OrderDetailsProvider>
                <ShowQrComponent />
              </OrderDetailsProvider>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  ),
});

function ShowQrComponent() {
  const {
    customer: { isRecipient: isRecipientCustomer },
    order: { transferTimelineStatus: status },
  } = useOrderDetails();

  switch (status) {
    case 'DELIVERY_MEETUP_SET': {
      if (isRecipientCustomer) {
        return <ShowQrCode />;
      }

      return <HeroAccessDenied className="bg-white" />;
    }

    default:
      return <HeroNotFound className="bg-white" />;
  }
}
