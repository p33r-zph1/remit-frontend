import './index.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';

import useAuth from './hooks/useAuth';
import { AuthProvider } from './contexts/AuthContext';

import { cognitoAuth } from './config/auth.config';
import { routeTree } from './config/router.config';
import { queryClient } from './config/query.config';

Amplify.configure({
  Auth: cognitoAuth,
});

cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    queryClient,
    auth: undefined!, // Injected in AuthProvider
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function InnerApp() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
