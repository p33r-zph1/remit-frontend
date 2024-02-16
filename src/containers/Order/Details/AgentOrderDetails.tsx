import CountdownCard from '@/src/components/Card/CountdownCard';
import OrderDetailsNav from '@/src/components/Nav/OrderDetailsNav';
import TransferTimeline from '@/src/components/Timeline/TransferTimeline';
import useOrderDetails from '@/src/hooks/useOrderDetails';
import { isOrderSettled } from '@/src/schema/order/transfer-timeline';

import RecipientAgentOrder from './Recipient/RecipientAgentOrder';
import SenderAgentOrder from './Sender/SenderAgentOrder';

export default function AgentOrderDetails() {
  const { agent, order } = useOrderDetails();

  const { isSender, isRecipient } = agent;
  const { transferTimeline, transferTimelineStatus, expiresAt } = order;

  return (
    <section className="flex flex-col space-y-12">
      <OrderDetailsNav {...order} isRecipient={false} />

      <div className="divider" />

      {!isOrderSettled(transferTimelineStatus) && (
        <CountdownCard endDate={expiresAt} />
      )}

      <main>
        {isSender && <SenderAgentOrder status={transferTimelineStatus} />}
        {isRecipient && <RecipientAgentOrder status={transferTimelineStatus} />}
      </main>

      <TransferTimeline timeline={transferTimeline} />
    </section>
  );
}
