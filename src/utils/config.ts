import { QueryClient } from '@tanstack/react-query';
import { ResourcesConfig } from 'aws-amplify';
import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

export const queryClient = new QueryClient();

export const authConfig: ResourcesConfig['Auth'] = {
  Cognito: {
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
  },
};

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
