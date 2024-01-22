import { FormEvent, useCallback } from 'react';
import Brand from '../components/Brand';
import Page from '../components/Page';

export default function Login() {
  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert('Submitted!');
  }, []);

  return (
    <Page className="mx-auto max-w-sm items-center justify-center space-y-16 p-0 md:max-w-md">
      <Brand />

      <form
        className="flex w-full flex-col space-y-5 rounded-lg border border-base-200 bg-white p-8 shadow-md"
        onSubmit={onSubmit}
      >
        <h1 className="text-3xl font-extrabold">Log in</h1>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-gray-400">ID #</span>
          </div>
          <input type="text" className="input input-bordered w-full" />
        </label>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-gray-400">Password</span>
          </div>
          <input type="password" className="input input-bordered w-full" />
        </label>

        <button
          className="btn btn-primary btn-block rounded-lg text-base font-semibold shadow-sm"
          type="submit"
        >
          {false && <span className="loading loading-spinner "></span>}
          Login
        </button>
      </form>
    </Page>
  );
}
