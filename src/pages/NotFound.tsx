import { Link } from '@tanstack/react-router';

export default function NotFound() {
  return (
    <div className="flex-1 hero bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-3xl md:text-5xl font-bold">Page Not Found</h1>
          <p className="py-6">
            We can&apos;t seem to find the page you&apos;re looking for.
            <br />
            It might have been removed, had its name changed or is temporarily
            unavailable.
          </p>
          <Link to="/" className="btn btn-primary btn-block md:btn-wide">
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}
