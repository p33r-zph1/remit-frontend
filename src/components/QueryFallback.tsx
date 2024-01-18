import { FallbackProps } from 'react-error-boundary';

export default function QueryFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="hero my-12 flex-1 rounded-lg bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Snap!</h1>
          <p className="py-6 tracking-wide">{error.message}</p>
          <button
            className="btn btn-primary btn-block md:btn-wide"
            onClick={resetErrorBoundary}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
