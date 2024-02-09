import { createLazyFileRoute } from '@tanstack/react-router';

import LoginForm from '../containers/LoginForm';
import Page from '../components/Page';
import Brand from '../components/Brand';

export const Route = createLazyFileRoute('/login')({
  component: () => (
    <Page className="mx-auto max-w-sm items-center justify-center space-y-16 p-0 md:max-w-md">
      <Brand />

      <LoginForm />
    </Page>
  ),
});
