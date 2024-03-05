import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { createLazyFileRoute, redirect } from '@tanstack/react-router';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import QueryFallback from '@/src/components/Fallback/QueryFallback';
import HeaderTitle from '@/src/components/HeaderTitle';
import Page from '@/src/components/Page';
import LoadingRing from '@/src/components/Spinner/LoadingRing';
import AgentProfile from '@/src/containers/Profile/AgentProfile';
import CustomerProfile from '@/src/containers/Profile/CustomerProfile';
import useAuth from '@/src/hooks/useAuth';

export const Route = createLazyFileRoute('/_auth/profile')({
  component: ProfileComponent,
});

function ProfileComponent() {
  const { hasGroup, user: userId } = useAuth();

  if (!userId) {
    // redirecting to login page...
    throw redirect({
      to: '/login',
    });
  }

  return (
    <Page className="mx-auto max-w-xl">
      <HeaderTitle className="md:text-center">My Profile</HeaderTitle>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<LoadingRing className="flex-1" />}>
              {hasGroup('customer') && <CustomerProfile customerId={userId} />}
              {hasGroup('agent') && <AgentProfile agentId={userId} />}
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  );
}
