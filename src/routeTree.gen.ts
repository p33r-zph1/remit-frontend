// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthRouteImport } from './routes/_auth/route'
import { Route as AuthHistoryImport } from './routes/_auth/history'
import { Route as AuthAlertsImport } from './routes/_auth/alerts'
import { Route as AuthOrderScanQrImport } from './routes/_auth/order/scanQr'
import { Route as AuthOrderOrderIdRouteImport } from './routes/_auth/order/$orderId/route'

// Create Virtual Routes

const AuthIndexLazyImport = createFileRoute('/_auth/')()

// Create/Update Routes

const LoginRoute = LoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRouteRoute = AuthRouteImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const AuthIndexLazyRoute = AuthIndexLazyImport.update({
  path: '/',
  getParentRoute: () => AuthRouteRoute,
} as any).lazy(() => import('./routes/_auth/index.lazy').then((d) => d.Route))

const AuthHistoryRoute = AuthHistoryImport.update({
  path: '/history',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthAlertsRoute = AuthAlertsImport.update({
  path: '/alerts',
  getParentRoute: () => AuthRouteRoute,
} as any)

const AuthOrderScanQrRoute = AuthOrderScanQrImport.update({
  path: '/order/scanQr',
  getParentRoute: () => AuthRouteRoute,
} as any).lazy(() =>
  import('./routes/_auth/order/scanQr.lazy').then((d) => d.Route),
)

const AuthOrderOrderIdRouteRoute = AuthOrderOrderIdRouteImport.update({
  path: '/order/$orderId',
  getParentRoute: () => AuthRouteRoute,
} as any).lazy(() =>
  import('./routes/_auth/order/$orderId/route.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      preLoaderRoute: typeof AuthRouteImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_auth/alerts': {
      preLoaderRoute: typeof AuthAlertsImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/history': {
      preLoaderRoute: typeof AuthHistoryImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/': {
      preLoaderRoute: typeof AuthIndexLazyImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/order/$orderId': {
      preLoaderRoute: typeof AuthOrderOrderIdRouteImport
      parentRoute: typeof AuthRouteImport
    }
    '/_auth/order/scanQr': {
      preLoaderRoute: typeof AuthOrderScanQrImport
      parentRoute: typeof AuthRouteImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthRouteRoute.addChildren([
    AuthAlertsRoute,
    AuthHistoryRoute,
    AuthIndexLazyRoute,
    AuthOrderOrderIdRouteRoute,
    AuthOrderScanQrRoute,
  ]),
  LoginRoute,
])
