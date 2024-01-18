import { ComponentPropsWithoutRef } from 'react';
import { cx } from '../utils';

type HeaderProps = ComponentPropsWithoutRef<'h1'>;

export default function HeaderTitle({ className, ...otherProps }: HeaderProps) {
  return (
    <h1
      {...otherProps}
      className={cx(
        'mb-6 mt-6 text-2xl font-semibold md:mb-6 md:mt-14 md:text-center md:text-3xl',
        className || ''
      )}
    />
  );
}
