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

import NavBar from '../components/Nav/NavBar';
import BottomNavigation from '../components/Nav/BottomNavigation';

import SendMoney from '../pages/send-money';
import Login from '../pages/login';
import Transfer from '../pages/transfer';
import History from '../pages/history';
import Alerts from '../pages/alerts';
import NotFound from '../pages/not-found';

export type Auth = {
  login: () => void;
  logout: () => void;
  status: 'loggedIn' | 'loggedOut';
};

export const auth: Auth = {
  status: 'loggedOut',
  login: () => {
    auth.status = 'loggedIn';
  },
  logout: () => {
    auth.status = 'loggedOut';
  },
};

const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: Auth;
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
    const authSession = await fetchAuthSession();

    context.queryClient.removeQueries();
    context.auth.status = authSession?.tokens ? 'loggedIn' : 'loggedOut';

    if (authSession?.tokens) {
      console.log('already logged in, going to homepage...');

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

    context.auth.status = session?.tokens ? 'loggedIn' : 'loggedOut';

    console.log({ status: context.auth.status });

    if (!session?.tokens) {
      throw redirect({
        to: loginRoute.to,
        search: {
          redirect: location.href,
        },
      });
    }
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
