import type { ReactNode } from 'react';

function Base({ children }: { children: ReactNode }) {
  return (
    <div className="mt-12 flex flex-col space-y-14 sm:mt-16">{children}</div>
  );
}

function Recipient() {
  return (
    <div className="flex flex-col space-y-4">
      {/* label */}
      <div className="skeleton h-6 w-24 md:h-7" />
      {/* input */}
      <div className="skeleton h-8 w-5/12 md:h-7" />
    </div>
  );
}

function Button() {
  return <div className="skeleton mt-14 h-10 w-full" />;
}

function Form({
  input1,
  summary,
  input2,
}: {
  input1?: boolean;
  summary?: boolean;
  input2?: boolean;
}) {
  return (
    <div className="flex flex-col space-y-7">
      {/* label w/ input */}
      {input1 && <div className="skeleton h-20 w-full" />}

      {/* summary */}
      {summary && (
        <>
          <div className="item-center flex justify-between px-8">
            <div className="skeleton h-4 w-1/3" />
            <div className="skeleton h-4 w-24" />
          </div>
          <div className="item-center flex justify-end px-4">
            <div className="skeleton h-8 w-full" />
          </div>
        </>
      )}

      {/* label w/ input */}
      {input2 && <div className="skeleton h-20 w-full" />}
    </div>
  );
}

export default function SendMoneySkeleton() {
  return (
    <Base>
      <Recipient />

      <Form input1 summary input2 />

      <Button />
    </Base>
  );
}

export function SecondCurrencySkeleton() {
  return (
    <Base>
      <Form summary input2 />

      <Button />
    </Base>
  );
}
