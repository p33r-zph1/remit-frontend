import OrderDetailsNav from '@/src/components/Nav/OrderDetailsNav';
import TransferTimeline from '@/src/components/Timeline/TransferTimeline';
import useOrderDetails from '@/src/hooks/useOrderDetails';

import RecipientAgentOrder from './RecipientAgentOrder';
import SenderAgentOrder from './SenderAgentOrder';

export default function AgentOrderDetails() {
  const { agent, order } = useOrderDetails();

  const { isSender, isRecipient } = agent;
  const { transferTimeline, transferTimelineStatus } = order;

  return (
    <section className="flex flex-col space-y-12">
      <OrderDetailsNav {...order} isRecipient={false} />

      <div className="divider" />

      <main>
        {isSender && <SenderAgentOrder status={transferTimelineStatus} />}
        {isRecipient && <RecipientAgentOrder status={transferTimelineStatus} />}
      </main>

      <TransferTimeline timeline={transferTimeline} />
    </section>
  );
}
