import './index.css';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Amplify } from 'aws-amplify';
import { defaultStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import { routeTree } from './routeTree.gen';

import useAuth from './hooks/useAuth';
import { AuthProvider } from './contexts/auth';

import { authConfig, queryClient, wagmiConfig } from './utils/config';
import LoadingRing from './components/Spinner/LoadingRing';
import DefaultFallback from './components/Fallback/DefaultFallback';

Amplify.configure({ Auth: authConfig });

cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <LoadingRing className="flex-1" />,
  defaultErrorComponent: ({ error }) => <DefaultFallback error={error} />,
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

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}

export function App() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
