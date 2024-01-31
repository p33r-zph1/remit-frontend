import { useCallback } from 'react';
import { useRouter } from '@tanstack/react-router';

import { logout } from '../aws-amplify/auth';
import { authRoute } from '../config/router.config';

export default function useLogout() {
  const { auth } = authRoute.useRouteContext();

  const router = useRouter();

  return useCallback(() => {
    return logout().then(() => {
      auth.logout();

      router.history.push('/login');
    });
  }, [auth, router.history]);
}
