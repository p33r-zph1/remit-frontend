import { ReactNode } from 'react';
import { getErrorMessage } from '../../utils/error';

export default function DefaultFallback({
  error,
  children,
}: {
  error: unknown;
  children?: ReactNode;
}) {
  return (
    <div className="hero my-12 flex-1 rounded-lg bg-base-100">
      <div className="hero-content flex max-w-md flex-col space-y-4 text-center">
        <h1 className="text-3xl font-bold md:text-5xl">Snap!</h1>

        <div className="mockup-code bg-slate-100 text-gray-600 shadow-md">
          <pre data-prefix="#">
            <code className="text-balance">{getErrorMessage(error)}</code>
          </pre>
        </div>

        {children}
      </div>
    </div>
  );
}
