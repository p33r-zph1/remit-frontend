import { Link } from '@tanstack/react-router';

export default function Brand() {
  return (
    <Link
      to="/"
      className="btn btn-ghost ring-primary focus:outline-none focus:ring-2"
    >
      <img src="/logo.svg" alt="Remit logo" />
      <p className="text-3xl font-bold md:text-4xl">remit</p>
    </Link>
  );
}
