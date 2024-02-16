import { createLazyFileRoute } from '@tanstack/react-router';

import Brand from '@/src/components/Brand';
import Page from '@/src/components/Page';
import LoginForm from '@/src/containers/LoginForm';

export const Route = createLazyFileRoute('/login')({
  component: () => (
    <Page className="mx-auto max-w-sm items-center justify-center space-y-16 p-0 md:max-w-md">
      <Brand />

      <LoginForm />
    </Page>
  ),
});
