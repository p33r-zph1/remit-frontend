import { createFileRoute, redirect } from '@tanstack/react-router';
import { fetchAuthSession } from 'aws-amplify/auth';
import { z } from 'zod';

import { fromJwt } from '../schema/cognito';

import LoginForm from '../containers/LoginForm';
import Page from '../components/Page';
import Brand from '../components/Brand';

export const Route = createFileRoute('/login')({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
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

  component: () => (
    <Page className="mx-auto max-w-sm items-center justify-center space-y-16 p-0 md:max-w-md">
      <Brand />

      <LoginForm />
    </Page>
  ),
});
