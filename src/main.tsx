import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Outlet,
  Router,
  Route,
  RootRoute,
  RouterProvider,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import NavBar from './components/NavBar';
import BottomNavigation from './components/BottomNavigation';
import SendMoney from './pages/SendMoney';
import Transfer from './pages/Transfer';
import TransactionHistory from './pages/TransactionHistory';
import Alerts from './pages/Alerts';

console.log(import.meta.env.DEV);

const rootRoute = new RootRoute({
  component: () => (
    <main className="pb-16 min-h-screen flex flex-col">
      <NavBar />

      <Outlet />

      <BottomNavigation />

      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </main>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <SendMoney />,
});

const transferRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/transfer',
  component: () => <Transfer />,
});

const transactionHistoryRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/transactionHistory',
  component: () => <TransactionHistory />,
});

const alertsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/alerts',
  component: () => <Alerts />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  transferRoute,
  transactionHistoryRoute,
  alertsRoute,
]);

const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
