import { QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import HeroNotFound from '@/src/components/Hero/HeroNotFound';
import { AuthContext } from '@/src/contexts/auth';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  auth: AuthContext;
}>()({
  component: () => (
    <main className="flex min-h-svh flex-col pb-16 lg:pb-0">
      <Outlet />

      {import.meta.env.DEV && <TanStackRouterDevtools />}
      {import.meta.env.DEV && <ReactQueryDevtools />}
    </main>
  ),
  notFoundComponent: () => <HeroNotFound className="min-h-svh" />,
});
