import { useMemo } from 'react';

import { Route } from '../../../routes/_auth/order/$orderId/route';
import useAuth from '../../../hooks/useAuth';
import useOrder from '../../../hooks/api/useOrder';

import TransferTimeline from '../../../components/Timeline/TransferTimeline';
import TransferDetailsNav from '../../../components/Nav/TransferDetailsNav';
import SenderOrder from './SenderOrder';
import RecipientOrder from './RecipientOrder';

export default function CustomerOrderDetails() {
  const { user } = useAuth();

  const { orderId } = Route.useParams();

  const { data: order } = useOrder({ orderId });

  const isSender = useMemo(
    () => user === order.senderId,
    [order.senderId, user]
  );

  const isRecipient = useMemo(
    () => user === order.recipientId,
    [order.recipientId, user]
  );

  return (
    <div className="flex flex-col space-y-12">
      <TransferDetailsNav {...order} isRecipient={isRecipient} />

      <div>
        <div className="divider -mb-2 md:-mb-6" />

        {isSender && <SenderOrder {...order} />}
        {isRecipient && <RecipientOrder {...order} />}
      </div>

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
    </div>
  );
}
