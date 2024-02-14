import OrderDetailsNav from '../../../components/Nav/OrderDetailsNav';
import TransferTimeline from '../../../components/Timeline/TransferTimeline';
import useOrderDetails from '../../../hooks/useOrderDetails';
import RecipientOrder from './RecipientCustomerOrder';
import SenderOrder from './SenderCustomerOrder';

export default function CustomerOrderDetails() {
  const { customer, order } = useOrderDetails();

  const { isSender, isRecipient } = customer;
  const { transferTimeline, transferTimelineStatus } = order;

  return (
    <section className="flex flex-col space-y-12">
      <OrderDetailsNav {...order} isRecipient={isRecipient} />

      <div className="divider" />

      <main>
        {isSender && <SenderOrder status={transferTimelineStatus} />}
        {isRecipient && <RecipientOrder status={transferTimelineStatus} />}
      </main>

      <TransferTimeline timeline={transferTimeline} />
    </section>
  );
}
