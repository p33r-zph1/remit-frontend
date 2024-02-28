import { Amplify, type ResourcesConfig } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { defaultStorage } from 'aws-amplify/utils';

import { parsedEnvs } from './env';

const authConfig: ResourcesConfig['Auth'] = {
  Cognito: {
    userPoolId: parsedEnvs.VITE_COGNITO_USER_POOL_ID,
    userPoolClientId: parsedEnvs.VITE_COGNITO_USER_POOL_CLIENT_ID,
  },
};

Amplify.configure({ Auth: authConfig });

cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);
