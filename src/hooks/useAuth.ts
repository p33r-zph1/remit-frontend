import { useCallback, useState } from 'react';
import { useRouter, useSearch } from '@tanstack/react-router';
import { signIn, type SignInInput } from 'aws-amplify/auth';

import { loginRoute } from '../config/router.config';

export default function useAuth() {
  const { auth } = loginRoute.useRouteContext();

  const router = useRouter();
  const search = useSearch({ from: loginRoute.fullPath });

  const [error, setError] = useState('');

  const authenticate = useCallback(
    async (input: SignInInput) => {
      try {
        const { isSignedIn, nextStep } = await signIn(input);

        if (isSignedIn && nextStep.signInStep === 'DONE') {
          auth.login();
          router.history.push(search.redirect ? search.redirect : '/');
          return;
        }

        throw new Error('Unhandled auth step');
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    },
    [auth, router, search]
  );

  return {
    authenticate,
    error,
  };
}
