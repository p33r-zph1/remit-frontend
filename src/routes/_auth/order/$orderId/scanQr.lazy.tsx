import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { createLazyFileRoute, redirect } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import QueryFallback from '@/src/components/Fallback/QueryFallback';
import HeroAccessDenied from '@/src/components/Hero/HeroAccessDenied';
import HeroNotFound from '@/src/components/Hero/HeroNotFound';
import Page from '@/src/components/Page';
import LoadingRing from '@/src/components/Spinner/LoadingRing';
import ScanQrCode from '@/src/containers/Order/QrCode/ScanQrCode';
import OrderDetailsProvider from '@/src/contexts/order-details';
import useOrderDetails from '@/src/hooks/useOrderDetails';

export const Route = createLazyFileRoute('/_auth/order/$orderId/scanQr')({
  component: () => (
    <Page className="mx-auto max-w-3xl">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<LoadingRing className="flex-1" />}>
              <OrderDetailsProvider>
                <ScanQrComponent />
              </OrderDetailsProvider>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  ),
});

function ScanQrComponent() {
  const {
    agent: { isRecipient: isRecipientAgent },
    order: { orderId, transferTimelineStatus: status },
  } = useOrderDetails();

  switch (status) {
    case 'ESCROW_RELEASED':
      throw redirect({
        to: '/order/$orderId',
        params: { orderId },
        replace: true,
      });

    case 'DELIVERY_MEETUP_SET': {
      if (isRecipientAgent) {
        return <ScanQrCode />;
      }

      return <HeroAccessDenied className="bg-white" />;
    }

    default:
      return <HeroNotFound className="bg-white" />;
  }
}
