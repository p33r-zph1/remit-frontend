import { Suspense } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import useAuth from '../hooks/useAuth';
import AgentOrders from '../containers/AgentOrders';

import Page from '../components/Page';
import SendForm from '../containers/SendForm';
import QueryFallback from '../components/QueryFallback';
import SendMoneySkeleton from '../components/Skeleton/SendMoneySkeleton';

export const Route = createFileRoute('/_auth/')({
  component: IndexComponent,
});

function IndexComponent() {
  const { group, hasGroup } = useAuth();

  console.log({ group, hasGroup: hasGroup('customer') });

  return (
    <Page className="mx-auto md:max-w-lg">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<SendMoneySkeleton />}>
              {hasGroup('customer') && <SendForm />}
              {hasGroup('agent') && <AgentOrders />}
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  );
}
