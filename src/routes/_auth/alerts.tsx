import { Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import Page from '../../components/Page';
import AlertList from '../../containers/AlertList';
import QueryFallback from '../../components/Fallback/QueryFallback';
import AlertSkeleton from '../../components/Skeleton/AlertSkeleton';
import HeaderTitle from '../../components/HeaderTitle';

export const Route = createFileRoute('/_auth/alerts')({
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
