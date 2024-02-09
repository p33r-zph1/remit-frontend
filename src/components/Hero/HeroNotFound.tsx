import { Link } from '@tanstack/react-router';
import type { ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentPropsWithRef<'div'>;

export default function HeroNotFound(props: Props) {
  return (
    <div
      {...props}
      className={twMerge('hero flex-1 bg-slate-100', props.className)}
    >
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold md:text-5xl">Page Not Found</h1>
          <p className="py-6">
            We can&apos;t seem to find the page you&apos;re looking for.
            <br />
            It might have been removed, had its name changed or is temporarily
            unavailable.
          </p>
          <Link to="/" className="btn btn-primary btn-block md:btn-wide">
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}
