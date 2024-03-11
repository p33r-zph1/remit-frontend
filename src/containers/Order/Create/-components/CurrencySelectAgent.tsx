import { XMarkIcon } from '@heroicons/react/20/solid';
import { useController, type UseControllerProps } from 'react-hook-form';

import SelectAgent from '@/src/components/Select/SelectAgent';
import type { OrderForm } from '@/src/hooks/useOrderForm';
import type { Agent } from '@/src/schema/agent';

type Props = UseControllerProps<OrderForm> & {
  list: Agent[];
};

export default function CurrencySelectAgent({
  list,
  ...controllerProps
}: Props) {
  const {
    field,
    formState: { isSubmitting },
    fieldState: { error },
  } = useController(controllerProps);

  return (
    <div className="flex items-center justify-between pl-14 pr-4 lg:pr-10">
      <div className="absolute left-6 -ml-px h-5 w-5 rounded-full bg-[#E7E9EB] p-1">
        <XMarkIcon className="h-full w-full text-gray-400" strokeWidth={2} />
      </div>

      <SelectAgent
        list={list}
        error={error}
        disabled={isSubmitting}
        {...field}
      />
    </div>
  );
}
