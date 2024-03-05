import { Link } from '@tanstack/react-router';

export default function EmptyProfile() {
  return (
    <div className="flex flex-1 items-center justify-center px-8 py-4 text-center text-gray-400">
      <span className="text-sm md:text-base">
        Please update your {` `}
        <Link to="/profile" className="link link-accent font-semibold">
          profile
        </Link>
        {` `}
        before continuing.
      </span>
    </div>
  );
}
