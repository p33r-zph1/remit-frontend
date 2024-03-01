import useGetCustomer from '@/src/hooks/api/useGetCustomer';

import EditProfile from './EditProfile';

type Props = {
  customerId: string;
};

export default function CustomerProfile({ customerId }: Props) {
  const { data: customer } = useGetCustomer({ customerId });

  return (
    <EditProfile
      userId={customerId}
      type="customers"
      walletAddress={customer.walletAddress}
      contact={customer.contactDetails}
    />
  );
}
