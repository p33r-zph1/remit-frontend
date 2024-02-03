import {
  Outlet,
  createRootRouteWithContext,
  createRoute,
  redirect,
} from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { fetchAuthSession } from 'aws-amplify/auth';
import { z } from 'zod';

import { fromJwt } from '../schema/cognito';
import { AuthContext } from '../contexts/AuthContext';

import NavBar from '../components/Nav/NavBar';
import BottomNavigation from '../components/Nav/BottomNavigation';

import SendMoney from '../pages/send-money';
import Login from '../pages/login';
import Transfer from '../pages/transfer';
import History from '../pages/history';
import Alerts from '../pages/alerts';
import NotFound from '../pages/not-found';

const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthContext;
}>()({
  component: () => (
    <main className="flex min-h-svh flex-col pb-16">
      <Outlet />

      {import.meta.env.DEV && <TanStackRouterDevtools />}
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </main>
  ),
  notFoundComponent: () => <NotFound />,
});

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  beforeLoad: async ({ context }) => {
    context.queryClient.removeQueries();

    const session = await fetchAuthSession();

    const idToken = session.tokens?.idToken;

    if (idToken) {
      // console.log('session found...');

      const username = fromJwt(idToken)?.['cognito:username'];

      if (!username) return; // return if no username found, continue with the login process.

      // console.log('already logged in, going to homepage...');
      context.auth.setUser(username);

      throw redirect({
        to: indexRoute.to,
      });
    }
  },
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: () => <Login />,
});

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'auth',
  beforeLoad: async ({ context, location }) => {
    const session = await fetchAuthSession();

    const idToken = session.tokens?.idToken;

    if (!idToken) {
      // console.log('redirecting to login page...');
      throw redirect({
        to: loginRoute.to,
        search: {
          redirect: location.href,
        },
      });
    }

    const username = fromJwt(idToken)?.['cognito:username'];
    const groups = fromJwt(idToken)?.['cognito:groups'];

    if (!username) return; // return if no username found, continue with the login process.

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

const indexRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/',
  component: () => <SendMoney />,
});

export const transferRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/transfer/$orderId',
  component: () => <Transfer />,
});

const historyRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/history',
  component: () => <History />,
});

const alertsRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/alerts',
  component: () => <Alerts />,
});

export const routeTree = rootRoute.addChildren([
  loginRoute,
  authRoute.addChildren([indexRoute, transferRoute, historyRoute, alertsRoute]),
]);
