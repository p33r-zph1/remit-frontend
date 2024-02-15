import { twMerge } from 'tailwind-merge';

type Props = {
  message: string;
  title?: string;
  tone?: 'default' | 'info';
};

const toneClasses: Record<NonNullable<Props['tone']>, string> = {
  default: 'bg-white',
  info: 'alert-info bg-info/20',
};

export default function LoadingAlert({
  message,
  title,
  tone = 'default',
}: Props) {
  return (
    <div role="alert" className={twMerge('alert shadow-md', toneClasses[tone])}>
      <span className="loading loading-dots"></span>

      <div className="w-full overflow-hidden text-balance break-words">
        <h3 className="font-bold">{title ? title : 'Hold on'}</h3>
        <div className="text-xs">{message}</div>
      </div>
    </div>
  );
}
