import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import Page from '../components/Page';
import SendForm from '../containers/SendForm';
import QueryFallback from '../components/QueryFallback';
import SendMoneySkeleton from '../components/Skeleton/SendMoneySkeleton';

export default function SendMoney() {
  return (
    <Page className="mx-auto md:max-w-lg">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<SendMoneySkeleton />}>
              <SendForm />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  );
}
