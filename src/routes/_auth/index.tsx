import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import QueryFallback from '../../components/Fallback/QueryFallback';
import Page from '../../components/Page';
import SendMoneySkeleton from '../../components/Skeleton/SendMoneySkeleton';
import LoadingRing from '../../components/Spinner/LoadingRing';
import AgentOrders from '../../containers/Orders/AgentOrders';
import SendForm from '../../containers/Send/SendForm';
import useAuth from '../../hooks/useAuth';

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
