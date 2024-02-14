import { useNavigate } from '@tanstack/react-router';
import type { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentPropsWithoutRef<'div'>;

export default function HeroAccessDenied(props: Props) {
  const navigate = useNavigate();

  return (
    <div
      {...props}
      className={twMerge('hero flex-1 bg-slate-100', props.className)}
    >
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold md:text-5xl">Page Access Denied</h1>
          <p className="py-6">
            Sorry! It looks like you don&apos;t have permission to view this
            page.
          </p>
          <button
            onClick={() => navigate({ to: '/' })}
            className="btn btn-primary btn-block md:btn-wide"
          >
            Go to home
          </button>
        </div>
      </div>
    </div>
  );
}
