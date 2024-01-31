import { useCallback } from 'react';
import { useRouter, useSearch } from '@tanstack/react-router';
import type { SignInInput } from 'aws-amplify/auth';

import { loginRoute } from '../config/router.config';
import { login } from '../aws-amplify/auth';

export default function useAuth() {
  const { auth } = loginRoute.useRouteContext();

  const router = useRouter();
  const search = useSearch({ from: loginRoute.fullPath });

  const authenticate = useCallback(
    (input: SignInInput) => {
      return login(input).then(() => {
        auth.login();

        router.history.push(search.redirect ? search.redirect : '/');
      });
    },
    [auth, router, search]
  );

  return {
    authenticate,
  };
}
