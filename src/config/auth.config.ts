import { ResourcesConfig } from 'aws-amplify';

export const cognitoAuth: ResourcesConfig['Auth'] = {
  Cognito: {
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
  },
};
