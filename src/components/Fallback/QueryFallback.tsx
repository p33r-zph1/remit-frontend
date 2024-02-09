import { type FallbackProps } from 'react-error-boundary';
import DefaultFallback from './DefaultFallback';

export default function QueryFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <DefaultFallback error={error}>
      <button
        className="btn btn-primary btn-block md:btn-wide"
        onClick={resetErrorBoundary}
      >
        Try again
      </button>
    </DefaultFallback>
  );
}
