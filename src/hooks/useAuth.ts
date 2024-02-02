import { useCallback, useState } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { signIn, type SignInInput } from 'aws-amplify/auth';

import { loginRoute } from '../config/router.config';

export default function useAuth() {
  const { auth } = loginRoute.useRouteContext();

  const navigate = useNavigate();
  const search = useSearch({ from: loginRoute.fullPath });

  const [error, setError] = useState('');

  const authenticate = useCallback(
    async (input: SignInInput) => {
      try {
        const { isSignedIn, nextStep } = await signIn(input);

        if (isSignedIn && nextStep.signInStep === 'DONE') {
          auth.login();
          navigate({ to: search.redirect });
          return;
        }

        throw new Error('Unhandled auth step');
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    },
    [auth, navigate, search]
  );

  return {
    authenticate,
    error,
  };
}
