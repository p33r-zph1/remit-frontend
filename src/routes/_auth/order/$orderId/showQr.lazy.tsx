import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { createLazyFileRoute, useNavigate } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import QueryFallback from '@/src/components/Fallback/QueryFallback';
import HeroAccessDenied from '@/src/components/Hero/HeroAccessDenied';
import HeroNotFound from '@/src/components/Hero/HeroNotFound';
import Page from '@/src/components/Page';
import LoadingRing from '@/src/components/Spinner/LoadingRing';
import ShowQrCode from '@/src/containers/Order/QrCode/ShowQrCode';
import OrderDetailsProvider from '@/src/contexts/order-details';
import useAuth from '@/src/hooks/useAuth';
import useOrderDetails from '@/src/hooks/useOrderDetails';

import { Route as ShowQrRoute } from './showQr';

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
  const { user: userId } = useAuth();
  const navigate = useNavigate({ from: ShowQrRoute.fullPath });

  const { order } = useOrderDetails();

  if (order.orderType !== 'CROSS_BORDER_REMITTANCE') {
    return <HeroAccessDenied className="bg-white" />;
  }

  const { transferTimelineStatus, recipientId, senderAgentId } = order;

  switch (transferTimelineStatus) {
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
      if (userId === recipientId) {
        return <ShowQrCode senderAgentId={senderAgentId} />;
      }

      return <HeroAccessDenied className="bg-white" />;
    }

    default:
      return <HeroNotFound className="bg-white" />;
  }
}
