import Brand from '../components/Brand';

export default function Login() {
  return (
    <main className="mx-auto max-w-md px-4 md:px-8 xl:px-0">
      <div className="flex min-h-screen flex-col items-center justify-center gap-16">
        <Brand />

        <div className="flex w-full flex-col gap-5 rounded-lg border border-[#EBEEF1] bg-white p-8 shadow-md">
          <h1 className="text-3xl font-extrabold text-[#0E1E2F]">Log in</h1>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold text-sleep-200">ID #</span>
            </div>
            <input type="text" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold text-sleep-200">
                Password
              </span>
            </div>
            <input type="password" className="input input-bordered w-full" />
          </label>

          <button className="btn btn-primary btn-block text-[15px] font-semibold shadow-sm">
            {false && <span className="loading loading-spinner"></span>}
            Login
          </button>
        </div>
      </div>
    </main>
  );
}
