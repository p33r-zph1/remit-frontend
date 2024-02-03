import { createFileRoute } from '@tanstack/react-router';

import Alerts from '../pages/alerts';

export const Route = createFileRoute('/_auth/alerts')({
  component: () => <Alerts />,
});
