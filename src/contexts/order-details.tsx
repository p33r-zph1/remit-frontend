import { ReactNode, createContext, useMemo } from 'react';

import { Route } from '../routes/_auth/order/$orderId/route';
import { Order } from '../schema/order';
import useOrder from '../hooks/api/useOrder';
import useAuth from '../hooks/useAuth';

type Role = {
  isSender: boolean;
  isRecipient: boolean;
};

interface OrderDetails {
  readonly order: Order;
  readonly customer: Role;
  readonly agent: Role;
}

export const OrderDetailsContext = createContext<OrderDetails | null>(null);

export function OrderDetailsProvider({ children }: { children: ReactNode }) {
  const { orderId } = Route.useParams();

  const { user: userId } = useAuth();
  const { data: order } = useOrder({ orderId });

  const { recipientId, senderId, recipientAgentId, senderAgentId } = order;

  const customer = useMemo(
    (): Role => ({
      isSender: userId === senderId,
      isRecipient: userId === recipientId,
    }),
    [recipientId, senderId, userId]
  );

  const agent = useMemo(
    (): Role => ({
      isSender: userId === senderAgentId,
      isRecipient: userId === recipientAgentId,
    }),
    [recipientAgentId, senderAgentId, userId]
  );

  return (
    <OrderDetailsContext.Provider
      value={{
        order,
        customer,
        agent,
      }}
    >
      {children}
    </OrderDetailsContext.Provider>
  );
}
