function SkeletonItem() {
  return (
    <div className="flex w-full flex-row items-center justify-between space-x-4 py-3">
      <div className="flex w-full flex-row items-center justify-center space-x-4">
        <div className="skeleton h-12 w-12 shrink-0 rounded-full md:h-14 md:w-14" />

        <div className="flex w-full flex-col space-y-4">
          <div className="skeleton h-4 w-5/6 md:h-7" />
          <div className="skeleton h-4 w-2/5 md:h-7" />
        </div>
      </div>

      <div className="flex w-full flex-col items-end space-y-4">
        <div className="skeleton h-4 w-full md:h-7" />
        <div className="skeleton h-4 w-4/6 md:h-7" />
      </div>
    </div>
  );
}

export default function OrderListSkeleton() {
  return (
    <>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </>
  );
}
