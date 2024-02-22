import { redirect } from '@tanstack/react-router';

import CommissionCard from '@/src/components/Card/CommissionCard';
import HeaderTitle from '@/src/components/HeaderTitle';
import useAgent from '@/src/hooks/api/useAgent';
import useAuth from '@/src/hooks/useAuth';

import OrderList from './OrderList';

export default function AgentOrders() {
  const { user } = useAuth();

  if (!user) {
    throw redirect({
      to: '/login',
    });
  }

  const { data: agent } = useAgent({ agentId: user });

  return (
    <div className="mt-8 flex flex-col space-y-10 sm:mt-16">
      <CommissionCard commission={agent.commission} isActive={agent.isActive} />

      <div>
        <HeaderTitle className="text-xl md:text-2xl">
          My Active Orders
        </HeaderTitle>
        <OrderList pageSize={5} status="active" />
      </div>

      <div>
        <HeaderTitle className="text-xl md:text-2xl">Open Orders</HeaderTitle>

        <OrderList pageSize={5} status="open" />
      </div>
    </div>
  );
}
