import { Suspense } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import ScanQrCode from '../../../containers/Orders/QrCode/ScanQrCode';

import Page from '../../../components/Page';
import QueryFallback from '../../../components/Fallback/QueryFallback';
import LoadingRing from '../../../components/Spinner/LoadingRing';

export const Route = createLazyFileRoute('/_auth/order/scanQr')({
  component: () => (
    <Page className="mx-auto max-w-3xl">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<LoadingRing className="flex-1" />}>
              <ScanQrCode />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  ),
});
