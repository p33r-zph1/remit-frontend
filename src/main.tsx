import './index.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';

import { cognitoAuth } from './config/auth.config';
import { auth, routeTree } from './config/router.config';
import { queryClient } from './config/query.config';

Amplify.configure({
  Auth: cognitoAuth,
});

cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
