import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import { fetchAuthSession } from 'aws-amplify/auth';

import { fromJwt } from '../schema/cognito';

import NavBar from '../components/Nav/NavBar';
import BottomNavigation from '../components/Nav/BottomNavigation';

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context, location }) => {
    const session = await fetchAuthSession();

    const idToken = session.tokens?.idToken;

    if (!idToken) {
      // redirecting to login page...
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }

    const username = fromJwt(idToken)?.['cognito:username'];
    const groups = fromJwt(idToken)?.['cognito:groups'];

    if (!username) return; // return if no username found (continue with the login process).

    // console.log('already logged in, hydrating...');
    context.auth.setUser(username);
    context.auth.setRole(groups);
  },
  component: () => (
    <>
      <NavBar />
      <Outlet />
      <BottomNavigation />
    </>
  ),
});
