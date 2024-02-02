import { MinusIcon, XMarkIcon } from '@heroicons/react/20/solid';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

import { cx } from '../utils';
import { Agent } from '../schema/agent';

type Props<T extends FieldValues> = UseControllerProps<T> & {
  list: Agent[];
};

export default function SendDetailsForm<T extends FieldValues>({
  list,
  ...controllerProps
}: Props<T>) {
  const {
    field,
    formState: { isSubmitting },
    fieldState: { error },
  } = useController(controllerProps);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-8 w-0.5 bg-[#E7E9EB]" />

      <div className="space-y-6 py-6">
        <div className="flex items-center justify-between pl-14 pr-4 lg:pr-10">
          <div className="absolute left-6 -ml-px h-5 w-5 rounded-full bg-[#E7E9EB] p-1">
            <MinusIcon
              className="h-full w-full text-sleep-200"
              strokeWidth={2}
            />
          </div>
          <span className="w-1/2 truncate text-sm font-semibold text-sleep-200">
            0.00
          </span>
          <span className="text-sm font-semibold text-sleep-200">
            Platform fee
          </span>
        </div>

        <div className="flex items-center justify-between pl-14 pr-4 lg:pr-10">
          <div className="absolute left-6 -ml-px h-5 w-5 rounded-full bg-[#E7E9EB] p-1">
            <XMarkIcon
              className="h-full w-full text-sleep-200"
              strokeWidth={2}
            />
          </div>
          <select
            className={cx(
              error && 'text-error',
              'select select-bordered w-full rounded-full shadow-sm duration-200 hover:shadow-md focus:outline-none disabled:border-slate-400'
            )}
            disabled={isSubmitting}
            {...field}
          >
            <option disabled value="default">
              {error?.message ? error?.message : 'Select agent commision'}
            </option>

            {list.map(item => (
              <option
                key={item.agentId}
                value={item.agentId}
                disabled={!item.isActive}
                className="text-gray-500"
              >
                {item.commission}% - {item.agentId}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
