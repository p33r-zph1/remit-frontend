import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import QueryFallback from '@/src/components/Fallback/QueryFallback';
import Page from '@/src/components/Page';
import SendMoneySkeleton from '@/src/components/Skeleton/SendMoneySkeleton';
import LoadingRing from '@/src/components/Spinner/LoadingRing';
import AgentOrders from '@/src/containers/Orders/AgentOrders';
import SendForm from '@/src/containers/Send/SendForm';
import useAuth from '@/src/hooks/useAuth';

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
