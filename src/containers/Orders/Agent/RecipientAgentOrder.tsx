import { Order } from '../../../schema/order';
import TakeOrder from '../TakeOrder';

type Props = Order;

export default function RecipientAgentOrder({
  transferTimelineStatus: status,
  orderId,
  fees,
}: Props) {
  switch (status) {
    case 'SENDER_AGENT_ACCEPTED':
      return (
        <TakeOrder
          orderId={orderId}
          recipientAgentCommission={fees.recipientAgentCommission || 'N/A'}
        />
      );

    case 'ESCROW_DEPOSITED': {
      return <div className="text-xs">TODO-display set delivery (maps)</div>;
    }

    case 'DELIVERY_MEETUP_SET': {
      return <div className="text-xs">TODO-display scan qr</div>;
    }

    default:
      break;
  }
}
