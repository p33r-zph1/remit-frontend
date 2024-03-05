import { CheckIcon } from '@heroicons/react/20/solid';
import { twMerge } from 'tailwind-merge';

type Props = {
  message: string;
  title?: string;
  isComplete?: boolean;
  action?:
    | {
        label: string;
        fn: () => void;
        disabled?: boolean;
      }
    | false;
};

export default function SuccessAlert({
  message,
  title,
  isComplete,
  action,
}: Props) {
  return (
    <div role="alert" className="alert bg-white shadow-md">
      <CheckIcon className={twMerge('h-6 w-6', isComplete && 'text-success')} />

      <div className="w-full overflow-hidden text-balance break-words">
        <h3 className={twMerge('font-bold', isComplete && 'text-success')}>
          {title}
        </h3>

        {message && (
          <div className={twMerge('text-xs', isComplete && 'text-success')}>
            {message}
          </div>
        )}
      </div>

      {action && (
        <button
          onClick={action.fn}
          disabled={action.disabled}
          className="btn btn-ghost btn-link btn-sm max-w-32 text-balance"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
