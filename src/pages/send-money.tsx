import { Suspense } from 'react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import Page from '../components/Page';
import SendForm from '../containers/SendForm';
import QueryFallback from '../components/QueryFallback';

export default function SendMoney() {
  return (
    <Page className="mx-auto max-w-sm md:max-w-lg">
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={QueryFallback} onReset={reset}>
            <Suspense fallback={<div>loading...</div>}>
              <SendForm />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </Page>
  );
}
