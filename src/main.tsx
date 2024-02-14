import './index.css';
import './configs/amplify-auth';
import './configs/buffer';

import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WagmiProvider } from 'wagmi';

import queryClient from './configs/tansact-query';
import router from './configs/tansact-router';
import wagmi from './configs/wagmi';
import AuthProvider from './contexts/auth';
import useAuth from './hooks/useAuth';

export function App() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WagmiProvider config={wagmi}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
