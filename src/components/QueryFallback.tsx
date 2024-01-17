import { FallbackProps } from 'react-error-boundary';

export default function QueryFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div className="hero bg-base-100 flex-1 my-12 rounded-lg">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Snap!</h1>
          <p className="tracking-wide py-6">{error.message}</p>
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
