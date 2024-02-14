import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import QueryFallback from '../../components/Fallback/QueryFallback';
import HeaderTitle from '../../components/HeaderTitle';
import Page from '../../components/Page';
import AlertSkeleton from '../../components/Skeleton/AlertSkeleton';
import AlertList from '../../containers/AlertList';

export const Route = createLazyFileRoute('/_auth/alerts')({
  component: () => (
    <Page className="mx-auto max-w-3xl">
      <HeaderTitle className="md:text-center">Alerts</HeaderTitle>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<AlertSkeleton />}>
              <AlertList />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  ),
});
