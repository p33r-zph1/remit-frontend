import { Bars3Icon, PowerIcon } from '@heroicons/react/20/solid';
import { Link } from '@tanstack/react-router';

import Brand from './Brand';

export default function NavBar() {
  return (
    <div className="navbar sticky top-0 bg-base-100">
      <div className="navbar-start visible md:invisible">
        <Brand />
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
              <a>Logout</a>
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
              to="/alerts"
              className="btn btn-ghost"
              activeProps={{
                className: 'text-primary',
              }}
            >
              Alerts
            </Link>
          </li>
          <li>
            <button className="btn btn-circle btn-ghost">
              <PowerIcon className="h-6 w-6 text-gray-500" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
