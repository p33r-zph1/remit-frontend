import { useCallback } from 'react';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { signOut } from 'aws-amplify/auth';

import { authRoute } from '../config/router.config';

export default function useLogout() {
  const { auth } = authRoute.useRouteContext();

  const router = useRouter();
  const navigate = useNavigate();

  return useCallback(() => {
    return signOut().then(() => {
      auth.logout();

      navigate({ to: '/login' });
      router.invalidate();
    });
  }, [auth, navigate, router]);
}
