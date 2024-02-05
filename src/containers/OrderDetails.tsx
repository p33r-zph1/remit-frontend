import { useMemo } from 'react';

import { Route } from '../routes/_auth.transfer.$orderId';
import useAuth from '../hooks/useAuth';
import useOrder from '../hooks/api/useOrder';

// import TransferMap from '../components/Location/MapsAPI';
// import HeaderTitle from '../components/HeaderTitle';
import TransferTimeline from '../components/Timeline/TransferTimeline';
import TransferDetailsNav from '../components/Nav/TransferDetailsNav';
import AcceptOrderForm from './AcceptOrderForm';
// import CalendarPopover from '../components/Popover/CalendarPopover';

export default function OrderDetails() {
  const { user } = useAuth();

  const { orderId } = Route.useParams();

  const { data: order } = useOrder({ orderId });

  // console.log({ group, timelineStatus: order.transferTimelineStatus });

  const isRecipient = useMemo(
    () => user === order.recipientId,
    [order.recipientId, user]
  );

  return (
    <>
      <TransferDetailsNav {...order} isRecipient={isRecipient} />

      <div className="divider -mb-2 md:-mb-6" />

      {order.transferTimelineStatus === 'PENDING' && (
        <AcceptOrderForm orderId={orderId} />
      )}

      {order.transferTimelineStatus === 'RECIPIENT_ACCEPTED' && (
        <div className="text-2xl">Recipient accepted</div>
      )}

      {order.transferTimelineStatus === 'RECIPIENT_REJECTED' && (
        <div className="text-2xl">Recipient rejected</div>
      )}

      {order.transferTimelineStatus === 'SENDER_AGENT_ACCEPTED' && (
        <div className="text-2xl">Sender agent accepted</div>
      )}

      {order.transferTimelineStatus === 'SENDER_AGENT_REJECTED' && (
        <div className="text-2xl">Sender agent rejected</div>
      )}

      {order.transferTimelineStatus === 'RECIPIENT_AGENT_ACCEPTED' && (
        <div className="text-2xl">Recipient agent accepted</div>
      )}

      {order.transferTimelineStatus === 'RECIPIENT_AGENT_REJECTED' && (
        <div className="text-2xl">Recipient agent rejected</div>
      )}

      {order.transferTimelineStatus === 'CASH_COLLECTED' && (
        <div className="text-2xl">{order.transferTimelineStatus}</div>
      )}

      {/* <div>
        <HeaderTitle>Delivery</HeaderTitle>

        <div>
          <div className="text-sm font-semibold text-gray-400">
            Set delivery date and time
          </div>

          <CalendarPopover />
        </div>

        <div>
          <div className="text-sm font-semibold text-gray-400">
            Set delivery area
          </div>

          <TransferMap />
        </div>
      </div> */}

      <TransferTimeline timeline={order.transferTimeline} />
    </>
  );
}
