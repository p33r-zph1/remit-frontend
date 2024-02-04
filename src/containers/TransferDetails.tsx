import { useMemo } from 'react';

import { Route } from '../routes/_auth.transfer.$orderId';
import useAuth from '../hooks/useAuth';
import useOrder from '../hooks/api/useOrder';

import TransferMap from '../components/Location/MapsAPI';
import HeaderTitle from '../components/HeaderTitle';
import TransferTimeline from '../components/Timeline/TransferTimeline';
import TransferDetailsNav from '../components/Nav/TransferDetailsNav';
import CalendarPopover from '../components/Popover/CalendarPopover';

export default function TransferDetails() {
  const { user } = useAuth();

  const { orderId } = Route.useParams();

  const { data: order } = useOrder({ orderId });

  const isRecipient = useMemo(
    () => user === order.recipientId,
    [order.recipientId, user]
  );

  return (
    <>
      <TransferDetailsNav {...order} isRecipient={isRecipient} />

      <div className="divider -mb-2 md:-mb-6" />

      <div>
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
      </div>

      <TransferTimeline timeline={order.transferTimeline} />
    </>
  );
}
