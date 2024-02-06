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
    <div className="flex flex-col space-y-12">
      <TransferDetailsNav {...order} isRecipient={false} />

      <div>
        <div className="divider -mb-2 md:-mb-6" />

        {isSender && <SenderAgentOrder status={transferTimelineStatus} />}
        {isRecipient && <RecipientAgentOrder status={transferTimelineStatus} />}
      </div>

      <TransferTimeline timeline={transferTimeline} />
    </div>
  );
}
