import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

import { type Commission, formatCommissionDetails } from '@/src/schema/fees';

type Props = {
  priceOracleRates: Record<string, number>;
  platformFee: Commission;
  agentFee?: Commission;
  summary?: {
    message: string;
    amount: string;
  };
};

export default function OrderDetails({
  priceOracleRates,
  agentFee,
  platformFee,
  summary,
}: Props) {
  return (
    <div className="w-full rounded-2xl bg-white sm:max-w-xs">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-primary/10 px-4 py-2 text-left text-sm font-medium hover:bg-primary/20 focus:outline-none focus-visible:ring focus-visible:ring-primary/75">
              <span>Order Details</span>
              <ChevronUpIcon
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-primary`}
              />
            </Disclosure.Button>

            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="p-4 text-sm text-gray-500 shadow-md">
                <code className="space-y-2">
                  <p>
                    FX Rate:
                    {Object.entries(priceOracleRates).map(([key, value]) => (
                      <div className="font-bold" key={key}>
                        <strong>&gt;{key} </strong> ({value})
                      </div>
                    ))}
                  </p>

                  <p>
                    Platform Fee:{' '}
                    <strong className="font-bold">
                      {formatCommissionDetails(platformFee)}
                    </strong>
                  </p>

                  {agentFee && (
                    <p>
                      Agent Fee:{' '}
                      <strong className="font-bold">
                        {formatCommissionDetails(agentFee)}
                      </strong>
                    </p>
                  )}

                  {summary && (
                    <p>
                      {summary.message}:{' '}
                      <strong className="font-bold">{summary.amount}</strong>
                    </p>
                  )}
                </code>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
