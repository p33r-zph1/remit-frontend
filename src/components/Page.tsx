import { ReactNode } from 'react';
import { cx } from '../utils';

type PageProps = {
  children: ReactNode;
  maxWidth: 'sm' | 'md' | 'lg' | 'wide' | 'full';
};

const baseClasses = 'flex w-full flex-1 flex-col px-6 py-2 sm:mx-auto';

const maxWidthClasses: Record<PageProps['maxWidth'], string> = {
  sm: 'sm:max-w-sm',
  md: 'md:max-w-md',
  lg: 'md:max-w-lg',
  wide: 'md:max-w-3xl',
  full: 'max-w-full',
};

export default function Page({ children, maxWidth }: PageProps) {
  return (
    <div className={cx(baseClasses, maxWidth && maxWidthClasses[maxWidth])}>
      {children}
    </div>
  );
}
