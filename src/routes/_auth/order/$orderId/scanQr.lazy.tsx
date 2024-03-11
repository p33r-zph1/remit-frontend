import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import QueryFallback from '@/src/components/Fallback/QueryFallback';
import HeroAccessDenied from '@/src/components/Hero/HeroAccessDenied';
import HeroNotFound from '@/src/components/Hero/HeroNotFound';
import Page from '@/src/components/Page';
import LoadingRing from '@/src/components/Spinner/LoadingRing';
import ScanQrCode from '@/src/containers/Order/QrCode/ScanQrCode';
import OrderDetailsProvider from '@/src/contexts/order-details';
import useAuth from '@/src/hooks/useAuth';
import useOrderDetails from '@/src/hooks/useOrderDetails';
import { getRecipientAgent } from '@/src/schema/order';

import { Route as ScanQrRoute } from './scanQr';

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
  const { user: userId } = useAuth();
  const navigate = useNavigate({ from: ScanQrRoute.fullPath });

  const { data: order } = useOrderDetails();

  const { transferTimelineStatus: timelineStatus } = order;

  switch (timelineStatus) {
    case 'CASH_DELIVERED':
    case 'ESCROW_RELEASED': {
      navigate({
        to: '/order/$orderId',
        replace: true,
        params: true,
      });
      return null;
    }

    case 'DELIVERY_MEETUP_SET': {
      const recipientAgentId = getRecipientAgent(order);

      if (userId === recipientAgentId) {
        return <ScanQrCode />;
      }

      return <HeroAccessDenied className="bg-white" />;
    }

    default:
      return <HeroNotFound className="bg-white" />;
  }
}
