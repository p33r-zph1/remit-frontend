import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

import Login from '../pages/login';
import { fetchAuthSession } from 'aws-amplify/auth';
import { fromJwt } from '../schema/cognito';

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context, search }) => {
    context.queryClient.removeQueries();

    const session = await fetchAuthSession();

    const idToken = session.tokens?.idToken;

    if (idToken) {
      // session found...

      const username = fromJwt(idToken)?.['cognito:username'];

      if (!username) return; // return if no username found (continue with the login process)

      // already logged in, going to homepage...
      context.auth.setUser(username);

      throw redirect({
        to: search.redirect || '/',
      });
    }
  },
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
}).update({
  component: () => <Login />,
});
