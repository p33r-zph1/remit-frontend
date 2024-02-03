import { createFileRoute } from '@tanstack/react-router';

import SendMoney from '../pages/send-money';

export const Route = createFileRoute('/_auth/')({
  component: () => <SendMoney />,
});
