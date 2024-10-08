type Props = {
  title?: string;
};

export default function EmptyOrder({ title }: Props) {
  return (
    <div className="flex flex-1 items-center justify-center px-8 py-16 text-center text-gray-400">
      <span className="text-base md:text-xl">
        {title ? title : 'No orders right now.'}
      </span>
    </div>
  );
}
