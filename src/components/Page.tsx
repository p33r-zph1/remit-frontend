import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentPropsWithoutRef<'div'>;

const baseClasses = 'flex w-full flex-1 flex-col px-6 py-2';

/**
 *
 * @description Base classes defined: `flex`, `w-full`, `flex-1`, `flex-col`, `px-6`, `py-2`, configurable with `twMerge`.
 *
 */
export default function Page({ className, ...otherProps }: Props) {
  return <div {...otherProps} className={twMerge(baseClasses, className)} />;
}
