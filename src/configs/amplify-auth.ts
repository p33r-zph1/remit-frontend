import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { defaultStorage } from 'aws-amplify/utils';

const authConfig: ResourcesConfig['Auth'] = {
  Cognito: {
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
    userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
  },
};

Amplify.configure({ Auth: authConfig });

cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);
