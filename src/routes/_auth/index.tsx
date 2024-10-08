import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import QueryFallback from '@/src/components/Fallback/QueryFallback';
import Page from '@/src/components/Page';
import CreateOrderSkeleton from '@/src/components/Skeleton/CreateOrderSkeleton';
import LoadingRing from '@/src/components/Spinner/LoadingRing';
import AgentViewOrders from '@/src/containers/Order/AgentViewOrders';
import CreateOrder from '@/src/containers/Order/Create/CreateOrder';
import useAuth from '@/src/hooks/useAuth';

export const Route = createFileRoute('/_auth/')({
  component: IndexComponent,
  pendingMs: 0,
  pendingMinMs: 0,
});

function IndexComponent() {
  const { user: userId, hasGroup } = useAuth();

  if (!userId) {
    // redirecting to login page...
    throw redirect({
      to: '/login',
    });
  }

  return (
    <Page className="mx-auto md:max-w-lg">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense
              fallback={
                hasGroup('customer') ? (
                  <CreateOrderSkeleton />
                ) : (
                  <LoadingRing className="flex-1" />
                )
              }
            >
              {hasGroup('customer') && <CreateOrder customerId={userId} />}
              {hasGroup('agent') && <AgentViewOrders agentId={userId} />}
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  );
}
