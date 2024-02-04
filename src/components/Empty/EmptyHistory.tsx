import { Link } from '@tanstack/react-router';

export default function EmptyHistory({ isCustomer }: { isCustomer: boolean }) {
  return (
    <div className="flex flex-1 items-center justify-center px-8 py-16 text-center text-lg text-sleep-100">
      <span className="text-base md:text-xl">
        No transactions yet.
        {isCustomer && (
          <>
            Maybe it&apos;s time to{' '}
            <Link
              to="/"
              className="link font-semibold text-primary underline decoration-black"
            >
              send
            </Link>{' '}
            some money?
          </>
        )}
      </span>
    </div>
  );
}
