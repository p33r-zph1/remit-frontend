import { createContext, type ReactNode, useMemo } from 'react';

import useOrder from '@/src/hooks/api/useOrder';
import useAuth from '@/src/hooks/useAuth';
import { Route } from '@/src/routes/_auth/order/$orderId/route';
import type { Order } from '@/src/schema/order';

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
