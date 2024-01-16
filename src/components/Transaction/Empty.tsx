export default function TransactionEmpty() {
  return (
    <div className="flex-1 flex justify-center items-center text-sleep-100 text-lg text-center px-8 py-16">
      <span>
        No transactions yet. Maybe it&apos;s time to{' '}
        <a className="link text-primary decoration-black underline font-semibold">
          send
        </a>{' '}
        some money?
      </span>
    </div>
  );
}
