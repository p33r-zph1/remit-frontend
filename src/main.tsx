import './index.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';

import { routeTree } from './routeTree.gen';

import useAuth from './hooks/useAuth';
import { AuthProvider } from './utils/auth';

import LoadingRing from './components/Spinner/LoadingRing';
import { authConfig, queryClient } from './utils/config';

Amplify.configure({ Auth: authConfig });

cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <LoadingRing className="flex-1" />,

  // defaultErrorComponent: ({ error }) => {
  //   return <QueryFallback error={error} resetErrorBoundary={() => {}} />;
  // },
  context: {
    queryClient,
    auth: undefined!, // Injected in AuthProvider
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
