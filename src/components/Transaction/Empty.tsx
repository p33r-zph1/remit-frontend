import { Link } from '@tanstack/react-router';

export default function TransactionEmpty() {
  return (
    <div className="flex-1 flex justify-center items-center text-sleep-100 text-lg text-center px-8 py-16">
      <span className="text-base md:text-xl">
        No transactions yet. Maybe it&apos;s time to{' '}
        <Link
          to="/"
          className="link text-primary decoration-black underline font-semibold"
        >
          send
        </Link>{' '}
        some money?
      </span>
    </div>
  );
}
