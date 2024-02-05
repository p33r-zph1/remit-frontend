import { Order } from '../../../schema/order';

import TakeOrder from '../TakeOrder';
import CollectCash from '../CollectCash';
import SendERC20 from '../SendERC20';

type Props = Order;

export default function SenderAgentOrder({
  transferTimelineStatus: status,
  fees,
  orderId,
}: Props) {
  switch (status) {
    case 'RECIPIENT_ACCEPTED':
    case 'RECIPIENT_AGENT_ACCEPTED':
      return (
        <TakeOrder
          orderId={orderId}
          recipientAgentCommission={fees.recipientAgentCommission || 'N/A'}
        />
      );

    case 'ORDER_ACCEPTED':
      return <CollectCash />;

    case 'CASH_COLLECTED':
      return <SendERC20 />;

    default:
      return null;
  }
}
