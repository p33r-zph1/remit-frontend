import {
  Bars3Icon,
  PowerIcon,
  UserCircleIcon,
} from '@heroicons/react/20/solid';
import { Link, useNavigate, useRouter } from '@tanstack/react-router';
import { useCallback } from 'react';

import useAuth from '@/src/hooks/useAuth';

import Brand from '../Brand';

export default function NavBar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  const router = useRouter();

  const signout = useCallback(() => {
    logout().then(() => {
      navigate({ to: '/login' });
      router.invalidate();
    });
  }, [logout, navigate, router]);

  return (
    <header className="navbar sticky top-0 z-40 bg-base-100">
      <div className="navbar-start visible md:invisible">
        <div className="flex lg:hidden">
          <Brand />
        </div>

        <div className="invisible flex space-x-1 lg:visible">
          <UserCircleIcon className="h-6 w-6" />

          <span className="font-semibold underline">{user}</span>
        </div>
      </div>

      <div className="navbar-center hidden md:flex">
        <Brand />
      </div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
            <Bars3Icon className="h-6 w-6" />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <button onClick={signout}>Logout</button>
            </li>
          </ul>
        </div>

        <ul className="hidden space-x-1 px-1 font-semibold lg:inline-flex">
          <li>
            <Link
              to="/"
              className="btn btn-ghost"
              activeProps={{
                className: 'text-primary',
              }}
            >
              Send
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className="btn btn-ghost"
              activeProps={{
                className: 'text-primary',
              }}
            >
              History
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="btn btn-ghost"
              activeProps={{
                className: 'text-primary',
              }}
            >
              My Profile
            </Link>
          </li>
          <li>
            <button onClick={signout} className="btn btn-circle btn-ghost">
              <PowerIcon className="h-6 w-6 text-gray-500" />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
