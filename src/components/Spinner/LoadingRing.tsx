import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentPropsWithoutRef<'div'>;

export default function LoadingRing({ className, ...otherProps }: Props) {
  return (
    <div
      {...otherProps}
      className={twMerge('flex items-center justify-center', className)}
    >
      <span className="loading loading-ring loading-lg"></span>
    </div>
  );
}
