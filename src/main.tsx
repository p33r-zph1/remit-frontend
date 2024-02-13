import './index.css';
import './configs/amplify-auth';
import './configs/buffer';

import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

import useAuth from './hooks/useAuth';
import { AuthProvider } from './contexts/auth';
import queryClient from './configs/tansact-query';
import router from './configs/tansact-router';
import wagmi from './configs/wagmi';

export function App() {
  const auth = useAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
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
