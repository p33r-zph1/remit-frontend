import { XCircleIcon } from '@heroicons/react/20/solid';

type Props = {
  message: string;
  title?: string;
};

export default function ErrorAlert({ message, title }: Props) {
  return (
    <div role="alert" className="alert bg-white shadow-md">
      <XCircleIcon className="h-5 w-5 text-error" />
      <div>
        <h3 className="font-bold text-error">{title ? title : 'Error'}</h3>
        <div className="text-xs text-error">{message}</div>
      </div>
    </div>
  );
}
