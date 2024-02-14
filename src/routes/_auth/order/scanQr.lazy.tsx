import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import QueryFallback from '@/src/components/Fallback/QueryFallback';
import HeroNotFound from '@/src/components/Hero/HeroNotFound';
import Page from '@/src/components/Page';
import LoadingRing from '@/src/components/Spinner/LoadingRing';
import ScanQrCode from '@/src/containers/Orders/QrCode/ScanQrCode';
import useAuth from '@/src/hooks/useAuth';

export const Route = createLazyFileRoute('/_auth/order/scanQr')({
  component: () => (
    <Page className="mx-auto max-w-3xl">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<LoadingRing className="flex-1" />}>
              <ScanQrComponent />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  ),
});

function ScanQrComponent() {
  const { hasGroup } = useAuth();
  const { orderId } = Route.useSearch();

  if (hasGroup('agent') && orderId) {
    return <ScanQrCode orderId={orderId} />;
  }

  return <HeroNotFound className="bg-white" />;
}
