import { useCallback } from 'react';
import { useRouter } from '@tanstack/react-router';
import { signOut } from 'aws-amplify/auth';

import { authRoute } from '../config/router.config';

export default function useLogout() {
  const { auth } = authRoute.useRouteContext();

  const router = useRouter();

  return useCallback(() => {
    return signOut().then(() => {
      auth.logout();

      router.invalidate();
      router.history.push('/login');
    });
  }, [auth, router]);
}
