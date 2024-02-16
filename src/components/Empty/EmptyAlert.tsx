import { Link } from '@tanstack/react-router';

export function AlertEmpty() {
  return (
    <div className="flex flex-1 items-center justify-center px-8 py-16 text-center text-lg text-gray-400">
      <span className="text-base md:text-xl">
        No alerts yet. Maybe it&apos;s time to{' '}
        <Link
          to="/"
          className="link font-semibold text-primary underline decoration-black"
        >
          send
        </Link>{' '}
        some money?
      </span>
    </div>
  );
}
