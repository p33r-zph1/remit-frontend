import useOrderDetails from '../../../hooks/useOrderDetails';

import SenderAgentOrder from './SenderAgentOrder';
import RecipientAgentOrder from './RecipientAgentOrder';
import TransferDetailsNav from '../../../components/Nav/TransferDetailsNav';
import TransferTimeline from '../../../components/Timeline/TransferTimeline';

export default function AgentOrderDetails() {
  const { agent, order } = useOrderDetails();

  const { isSender, isRecipient } = agent;
  const { transferTimeline, transferTimelineStatus } = order;

  return (
    <section className="flex flex-col space-y-12">
      <TransferDetailsNav {...order} isRecipient={false} />

      <div className="divider" />

      <main>
        {isSender && <SenderAgentOrder status={transferTimelineStatus} />}
        {isRecipient && <RecipientAgentOrder status={transferTimelineStatus} />}
      </main>

      <TransferTimeline timeline={transferTimeline} />
    </section>
  );
}
