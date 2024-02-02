import { transferRoute } from '../config/router.config';
import useSingleOrder from '../hooks/api/useSingleOrder';

import TransferMap from '../components/Location/MapsAPI';
import HeaderTitle from '../components/HeaderTitle';
import TransferTimeline from '../components/Timeline/TransferTimeline';
import TransferDetailsNav from '../components/Nav/TransferDetailsNav';
import CalendarPopover from '../components/Popover/CalendarPopover';
import { selectSenderValue } from '../schema/order';

export default function TransferDetails() {
  const { orderId } = transferRoute.useParams();

  const { data: order } = useSingleOrder({ orderId });

  // console.log(order);

  return (
    <>
      <TransferDetailsNav
        status={order.orderStatus}
        amount={selectSenderValue(order)}
        recipient={order.recipientId}
      />

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
