function SkeletonItem() {
  return (
    <div className="w-full flex flex-row items-center justify-between space-x-1 py-3">
      <div className="flex flex-col space-y-4 w-full">
        <div className="skeleton h-4 w-5/6 md:h-7" />
        <div className="skeleton h-4 w-2/5 md:h-7" />
      </div>

      <div className="skeleton h-4 w-20 md:h-7" />
    </div>
  );
}

export default function AlertSkeleton() {
  return (
    <>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </>
  );
}
