import { createContext, type PropsWithChildren } from 'react';

import useGetOrder from '@/src/hooks/api/useGetOrder';
import { Route } from '@/src/routes/_auth/order/$orderId';
import type { Order } from '@/src/schema/order';

interface OrderDetailsContext {
  readonly order: Order;
}

export const OrderDetailsContext = createContext<OrderDetailsContext | null>(
  null
);

export default function OrderDetailsProvider({ children }: PropsWithChildren) {
  const { orderId } = Route.useParams();

  const { data: order } = useGetOrder({ orderId });

  return (
    <OrderDetailsContext.Provider
      value={{
        order,
      }}
    >
      {children}
    </OrderDetailsContext.Provider>
  );
}
