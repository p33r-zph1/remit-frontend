import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Outlet,
  Router,
  Route,
  RouterProvider,
  rootRouteWithContext,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import NavBar from './components/NavBar';
import BottomNavigation from './components/BottomNavigation';

import SendMoney from './pages/send-money';
import Login from './pages/login';
import Transfer from './pages/transfer';
import History from './pages/history';
import Alerts from './pages/alerts';
import NotFound from './pages/not-found';

const rootRoute = rootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <main className="flex min-h-dvh flex-col pb-16">
      <Outlet />

      {import.meta.env.DEV && <TanStackRouterDevtools />}
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </main>
  ),
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: () => <Login />,
});

const notFoundRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/not-found',
  component: () => <NotFound />,
});

const mainRoute = new Route({
  getParentRoute: () => rootRoute,
  id: 'main',
  component: () => (
    <>
      <NavBar />
      <Outlet />
      <BottomNavigation />
    </>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => mainRoute,
  path: '/',
  component: () => <SendMoney />,
});

const transferRoute = new Route({
  getParentRoute: () => mainRoute,
  path: '/transfer',
  component: () => <Transfer />,
});

const historyRoute = new Route({
  getParentRoute: () => mainRoute,
  path: '/history',
  component: () => <History />,
});

const alertsRoute = new Route({
  getParentRoute: () => mainRoute,
  path: '/alerts',
  component: () => <Alerts />,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  mainRoute.addChildren([indexRoute, transferRoute, historyRoute, alertsRoute]),
]);

const queryClient = new QueryClient();

const router = new Router({
  routeTree,
  notFoundRoute,
  context: {
    queryClient,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
