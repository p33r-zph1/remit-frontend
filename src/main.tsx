import './index.css';
import './configs/env';
import './configs/buffer';
import './configs/amplify-auth';

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
import { preloadError } from './utils/error';

/**
 * @description Load Error Handling (Code splitting)
 * @see https://vitejs.dev/guide/build#load-error-handling
 */
window.addEventListener('vite:preloadError', () => {
  preloadError();
  router.invalidate();
});

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
