import { useMemo } from 'react';

import useOrder from '../../../hooks/api/useOrder';
import { Route } from '../../../routes/_auth/order/$orderId/route';
import useAuth from '../../../hooks/useAuth';

import SenderAgentOrder from './SenderAgentOrder';
import RecipientAgentOrder from './RecipientAgentOrder';
import TransferDetailsNav from '../../../components/Nav/TransferDetailsNav';
import TransferTimeline from '../../../components/Timeline/TransferTimeline';

export default function AgentOrderDetails() {
  const { user } = useAuth();
  const { orderId } = Route.useParams();

  const { data: order } = useOrder({ orderId });

  const isSenderAgent = useMemo(
    () => user === order.senderAgentId,
    [order.senderAgentId, user]
  );

  const isRecipientAgent = useMemo(
    () => user === order.recipientAgentId,
    [order.recipientAgentId, user]
  );

  return (
    <div className="flex flex-col space-y-12">
      <TransferDetailsNav {...order} isRecipient={false} />

      <div>
        <div className="divider -mb-2 md:-mb-6" />

        {isSenderAgent && <SenderAgentOrder {...order} />}
        {isRecipientAgent && <RecipientAgentOrder {...order} />}
      </div>

      <TransferTimeline timeline={order.transferTimeline} />
    </div>
  );
}
