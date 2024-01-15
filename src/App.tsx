import { Fragment } from 'react';
import NavBar from './_components/NavBar';
import Login from './pages/Login';

// TODO: implement login functionality
const isLoggedin = true;

export default function App() {
  if (!isLoggedin) return <Login />;

  return (
    <Fragment>
      <NavBar />

      <main className="px-6 py-2">
        <label className="flex flex-col mt-4 max-w-md md:mx-auto md:mt-16">
          <span className="label-text text-sleep-100 text-base">Recipient</span>
          <input
            type="text"
            placeholder="Enter recipient number"
            className="input input-ghost border-0 focus:outline-none p-0 font-bold text-2xl placeholder:text-lg placeholder:opacity-50"
          />
        </label>

        <label className="flex flex-col mt-12 max-w-md md:mx-auto relative">
          <span className="absolute top-3 left-8 text-sm text-sleep-200">
            You send
          </span>
          <input
            type="text"
            className="rounded-full font-bold border-brand pl-8 pt-9 pb-3 text-xl"
            placeholder="0.00"
          />
        </label>
      </main>
    </Fragment>
  );
}
