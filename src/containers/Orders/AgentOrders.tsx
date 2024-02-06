import { PencilSquareIcon } from '@heroicons/react/24/outline';

import OrderList from './OrderList';
import useAgent from '../../hooks/api/useAgent';
import useAuth from '../../hooks/useAuth';

import HeaderTitle from '../../components/HeaderTitle';

function CommisionCard({
  commision,
  isActive,
}: {
  commision: string;
  isActive: boolean;
}) {
  return (
    <div className="flex flex-col items-stretch justify-center space-y-4 rounded-lg bg-card-gradient px-4 py-8 text-primary-content shadow-md duration-200 hover:bg-primary md:p-8">
      <div className="flex items-center justify-between">
        <h1 className=" text-2xl font-bold tracking-wide md:text-3xl">
          My Commision
        </h1>

        <label className="flex cursor-pointer items-center justify-center space-x-2">
          <span className="text-sm font-bold">Active</span>

          <input
            type="checkbox"
            className="toggle toggle-primary toggle-md"
            checked={isActive}
            onChange={() => {}}
          />
        </label>
      </div>

      <div className="flex items-center justify-between">
        <div className="group flex items-end space-x-1">
          <h2 className="text-balance text-3xl font-semibold">{commision}%</h2>
          <span className="text-sm">on all orders</span>
        </div>

        <button className="btn btn-circle btn-ghost">
          <PencilSquareIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}

export default function AgentOrders() {
  const { user } = useAuth();

  const { data: agent } = useAgent(user);

  return (
    <div className="mt-8 flex flex-col space-y-10 sm:mt-16">
      <CommisionCard commision={agent.commission} isActive={agent.isActive} />

      <div>
        <HeaderTitle className="text-xl md:text-2xl">
          My Active Orders
        </HeaderTitle>
        <OrderList pageNumber={1} pageSize={10} status="active" />
      </div>

      <div>
        <HeaderTitle className="text-xl md:text-2xl">Open Orders</HeaderTitle>

        <OrderList pageNumber={1} pageSize={10} status="open" />
      </div>
    </div>
  );
}
