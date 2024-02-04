import { QueryClient } from '@tanstack/react-query';
import { ResourcesConfig } from 'aws-amplify';

export const queryClient = new QueryClient();

export const authConfig: ResourcesConfig['Auth'] = {
  Cognito: {
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
  },
};
