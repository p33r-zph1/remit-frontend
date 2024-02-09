import { Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import useAuth from '../../hooks/useAuth';
import AgentOrders from '../../containers/Orders/AgentOrders';

import Page from '../../components/Page';
import SendForm from '../../containers/Send/SendForm';
import QueryFallback from '../../components/Fallback/QueryFallback';
import SendMoneySkeleton from '../../components/Skeleton/SendMoneySkeleton';
import LoadingRing from '../../components/Spinner/LoadingRing';

export const Route = createFileRoute('/_auth/')({
  component: IndexComponent,
});

function IndexComponent() {
  const { hasGroup } = useAuth();

  return (
    <Page className="mx-auto md:max-w-lg">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense
              fallback={
                hasGroup('customer') ? (
                  <SendMoneySkeleton />
                ) : (
                  <LoadingRing className="flex-1" />
                )
              }
            >
              {hasGroup('customer') && <SendForm />}
              {hasGroup('agent') && <AgentOrders />}
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  );
}
