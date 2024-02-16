import { type ComponentPropsWithRef, forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

import type { Agent } from '@/src/schema/agent';

type Props = ComponentPropsWithRef<'select'> & {
  list: Agent[];
  error: FieldError | undefined;
};

const SelectAgent = forwardRef<HTMLSelectElement, Props>(
  ({ list, error, ...selectProps }: Props, ref) => {
    return (
      <select
        ref={ref}
        className={twMerge(
          error && 'text-error',
          'select select-bordered w-full rounded-full shadow-sm duration-200 hover:shadow-md focus:outline-none disabled:border-slate-400'
        )}
        {...selectProps}
      >
        <option disabled value="default">
          {error?.message ? error?.message : 'Select agent commission'}
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
    );
  }
);

SelectAgent.displayName = 'SelectAgent';

export default SelectAgent;
