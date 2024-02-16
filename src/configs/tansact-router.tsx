import { createRouter } from '@tanstack/react-router';

import DefaultFallback from '@/src/components/Fallback/DefaultFallback';
import LoadingRing from '@/src/components/Spinner/LoadingRing';
import { routeTree } from '@/src/routeTree.gen';

import queryClient from './tansact-query';

const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <LoadingRing className="flex-1" />,
  defaultErrorComponent: ({ error }) => <DefaultFallback error={error} />,
  context: {
    queryClient,
    auth: undefined!, // Injected in AuthProvider
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

export default router;

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
