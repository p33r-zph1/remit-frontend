export default function SendMoneySkeleton() {
  return (
    <div className="mt-12 flex flex-col space-y-14 sm:mt-16">
      <div className="flex flex-col space-y-4">
        {/* label */}
        <div className="skeleton h-6 w-24 md:h-7" />
        {/* input */}
        <div className="skeleton h-8 w-5/12 md:h-7" />
      </div>

      <div className="flex flex-col space-y-7">
        {/* label w/ input */}
        <div className="skeleton h-20 w-full" />

        {/* summary */}
        <div className="item-center flex justify-between px-8">
          <div className="skeleton h-4 w-1/3" />
          <div className="skeleton h-4 w-24" />
        </div>
        <div className="item-center flex justify-end px-4">
          <div className="skeleton h-8 w-full" />
        </div>
        {/* label w/ input */}
        <div className="skeleton h-20 w-full" />
      </div>

      {/* button */}
      <div className="skeleton mt-14 h-10 w-full" />
    </div>
  );
}
