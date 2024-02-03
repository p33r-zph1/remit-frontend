import { createFileRoute } from '@tanstack/react-router';
import Transfer from '../pages/transfer';

export const Route = createFileRoute('/_auth/transfer/$orderId')({
  component: () => <Transfer />,
});
