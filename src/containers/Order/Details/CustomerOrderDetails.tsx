import CountdownCard from '@/src/components/Card/CountdownCard';
import OrderDetailsNav from '@/src/components/Nav/OrderDetailsNav';
import TransferTimeline from '@/src/components/Timeline/TransferTimeline';
import useOrderDetails from '@/src/hooks/useOrderDetails';
import { isOrderSettled } from '@/src/schema/order/transfer-timeline';

import RecipientOrder from './Recipient/RecipientCustomerOrder';
import SenderOrder from './Sender/SenderCustomerOrder';

export default function CustomerOrderDetails() {
  const { customer, order } = useOrderDetails();

  const { isSender, isRecipient } = customer;
  const { transferTimeline, transferTimelineStatus, expiresAt } = order;

  return (
    <section className="flex flex-col space-y-12">
      <OrderDetailsNav {...order} isRecipient={isRecipient} />

      <div className="divider" />

      {!isOrderSettled(transferTimelineStatus) && (
        <CountdownCard endDate={expiresAt} />
      )}

      <main>
        {isSender && <SenderOrder status={transferTimelineStatus} />}
        {isRecipient && <RecipientOrder status={transferTimelineStatus} />}
      </main>

      <TransferTimeline timeline={transferTimeline} />
    </section>
  );
}
