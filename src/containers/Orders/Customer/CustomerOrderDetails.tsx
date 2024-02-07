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
    <section className="flex flex-col space-y-12">
      <TransferDetailsNav {...order} isRecipient={isRecipient} />

      <div>
        <div className="divider" />

        {isSender && <SenderOrder status={transferTimelineStatus} />}
        {isRecipient && <RecipientOrder status={transferTimelineStatus} />}
      </div>

      <TransferTimeline timeline={transferTimeline} />
    </section>
  );
}
