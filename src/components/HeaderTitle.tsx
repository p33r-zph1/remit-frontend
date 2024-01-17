import { ComponentPropsWithoutRef } from 'react';
import { cx } from '../utils';

type HeaderProps = ComponentPropsWithoutRef<'h1'>;

export default function HeaderTitle({ className, ...otherProps }: HeaderProps) {
  return (
    <h1
      {...otherProps}
      className={cx(
        'text-2xl font-semibold mt-6 mb-6 md:mt-14 md:mb-6 md:text-3xl md:text-center',
        className || ''
      )}
    />
  );
}
