import { PencilSquareIcon } from '@heroicons/react/24/outline';

type Props = {
  commission: number;
  isActive: boolean;
};

export default function CommissionCard({ commission, isActive }: Props) {
  return (
    <div className="flex flex-col items-stretch justify-center space-y-4 rounded-lg bg-gradient-to-b from-deep-blue to-regal-blue px-4 py-8 text-primary-content shadow-md duration-200 hover:bg-deep-blue md:p-8">
      <div className="flex items-center justify-between">
        <h1 className=" text-2xl font-bold tracking-wide md:text-3xl">
          My Commission
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
          <h2 className="text-balance text-3xl font-semibold">{commission}%</h2>
          <span className="text-sm">on all orders</span>
        </div>

        <button type="button" className="btn btn-circle btn-ghost">
          <PencilSquareIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}
