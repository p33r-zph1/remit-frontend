import { Bars3Icon } from '@heroicons/react/20/solid';

function Brand() {
  return (
    <button className="btn btn-ghost">
      <img src="/logo.svg" alt="Remit logo" />
      <p className="text-3xl md:text-4xl font-bold">remit</p>
    </button>
  );
}

export default function NavBar() {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start visible md:invisible">
        <Brand />
      </div>

      <div className="navbar-center hidden md:flex">
        <Brand />
      </div>

      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <Bars3Icon className="h-6 w-6" />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
