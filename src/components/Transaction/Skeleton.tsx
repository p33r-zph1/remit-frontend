function SkeletonItem() {
  return (
    <div className="w-full flex flex-row items-center justify-between space-x-4 py-3 md:max-w-xl md:mx-auto">
      <div className="flex flex-row items-center justify-center space-x-4 w-full">
        <div className="skeleton w-12 md:w-14 h-12 md:h-14 rounded-full shrink-0" />

        <div className="flex flex-col space-y-4 w-full">
          <div className="skeleton h-4 w-5/6 md:h-7" />
          <div className="skeleton h-4 w-2/5 md:h-7" />
        </div>
      </div>

      <div className="flex flex-col space-y-4 w-full items-end">
        <div className="skeleton h-4 w-full md:h-7" />
        <div className="skeleton h-4 w-4/6 md:h-7" />
      </div>
    </div>
  );
}

export default function TransactionSkeleton() {
  return (
    <>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </>
  );
}
