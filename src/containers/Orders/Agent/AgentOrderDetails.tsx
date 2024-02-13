import useOrderDetails from '../../../hooks/useOrderDetails';

import SenderAgentOrder from './SenderAgentOrder';
import RecipientAgentOrder from './RecipientAgentOrder';
import OrderDetailsNav from '../../../components/Nav/OrderDetailsNav';
import TransferTimeline from '../../../components/Timeline/TransferTimeline';

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
