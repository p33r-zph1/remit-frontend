import useOrderDetails from '../../../hooks/useOrderDetails';

import SenderOrder from './SenderCustomerOrder';
import RecipientOrder from './RecipientCustomerOrder';
import TransferTimeline from '../../../components/Timeline/TransferTimeline';
import TransferDetailsNav from '../../../components/Nav/TransferDetailsNav';

export default function CustomerOrderDetails() {
  const { customer, order } = useOrderDetails();

  const { isSender, isRecipient } = customer;
  const { transferTimeline, transferTimelineStatus } = order;

  return (
    <section className="flex flex-col space-y-6">
      <TransferDetailsNav {...order} isRecipient={isRecipient} />

      <div className="divider" />

      <main>
        {isSender && <SenderOrder status={transferTimelineStatus} />}
        {isRecipient && <RecipientOrder status={transferTimelineStatus} />}
      </main>

      <TransferTimeline timeline={transferTimeline} />
    </section>
  );
}
