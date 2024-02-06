import { useContext } from 'react';
import { OrderDetailsContext } from '../contexts/order-details';

export default function useOrderDetails() {
  const orderDetails = useContext(OrderDetailsContext);

  if (!orderDetails) {
    throw new Error(
      'useOrderDetails must be used within an OrderDetailsProvider'
    );
  }

  return orderDetails;
}
