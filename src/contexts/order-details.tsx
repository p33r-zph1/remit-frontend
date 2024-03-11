import { createContext, type PropsWithChildren } from 'react';

import useGetOrder from '@/src/hooks/api/useGetOrder';
import { Route } from '@/src/routes/_auth/order/$orderId';

type OrderDetailsContext = ReturnType<typeof useGetOrder>;

export const OrderDetailsContext = createContext<OrderDetailsContext | null>(
  null
);

export default function OrderDetailsProvider({ children }: PropsWithChildren) {
  const { orderId } = Route.useParams();

  const props = useGetOrder({ orderId });

  return (
    <OrderDetailsContext.Provider value={props}>
      {children}
    </OrderDetailsContext.Provider>
  );
}
