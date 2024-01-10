export default function App() {
  return (
    <div className="container mx-auto px-4 max-w-xl md:px-8 xl:px-0">
      <div className="min-h-screen flex flex-col gap-16 justify-center items-center">
        <img src="/remit.svg" alt="Remit logo" />

        <div className="w-full flex flex-col gap-5 p-8 rounded-lg border border-[#EBEEF1] bg-white shadow-md">
          <h1 className="text-[#0E1E2F] text-3xl font-extrabold">Log in</h1>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text=[#757F87] font-bold">ID #</span>
            </div>
            <input type="text" className="input input-bordered w-full" />
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text text=[#757F87] font-bold">
                Password
              </span>
            </div>
            <input type="password" className="input input-bordered w-full" />
          </label>

          <button className="btn btn-primary btn-block text-[15px] font-semibold">
            {false && <span className="loading loading-spinner"></span>}
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
