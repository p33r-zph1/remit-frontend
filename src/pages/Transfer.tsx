import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { ArrowLeftIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

export default function Transfer() {
  return (
    <div className="px-6 py-2 sm:max-w-3xl sm:mx-auto">
      <button className="btn btn-ghost btn-circle mt-6 mb-2 sm:mt-16 -ml-3">
        <ArrowLeftIcon className="h-4 w-4 md:w-6 md:h-6 text-black" />
      </button>
      <div className="flex flex-col space-y-4 py-1">
        <div className="text-sleep-100 text-base md:text-lg">
          You are sending
        </div>

        <div className="flex flex-row justify-between items-center py-1">
          <div className="text-3xl font-bold max-w-sm md:text-4xl transition hover:scale-105 duration-200">
            <span className="">12,497,549.47</span> PHP
          </div>
          <ArrowUpIcon className="w-12 h-12 bg-gray-500 rounded-full p-3 text-white" />
        </div>

        <div className="text-sleep-200 text-base md:text-lg">
          Recipient: 123456789
        </div>
      </div>

      <div className="text-xl font-semibold mt-12 md:mt-16">
        Transfer timeline
      </div>

      <ul className="timeline timeline-vertical timeline-compact">
        <li>
          <hr className="bg-primary" />
          <div className="timeline-middle">
            <CheckCircleIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="timeline-end timeline-box group">
            <div className="flex flex-col">
              <span className="text-xs md:text-sm font-semibold">
                Today at 4:23pm
              </span>
              <span className="text-xs group-hover:text-sm md:text-sm md:group-hover:text-base duration-200">
                You set up your transfer
              </span>
            </div>
          </div>
          <hr className="bg-primary" />
        </li>

        <li>
          <hr className="bg-primary" />
          <div className="timeline-middle">
            <CheckCircleIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="timeline-end timeline-box group">
            <div className="flex flex-col">
              <span className="text-xs md:text-sm font-semibold">
                Today at 6:76pm
              </span>
              <span className="text-xs group-hover:text-sm md:text-sm md:group-hover:text-base duration-200">
                Agent #5235623 collected your cash
              </span>
            </div>
          </div>
          <hr className="bg-primary" />
        </li>

        <li>
          <hr className="bg-error" />
          <div className="timeline-middle">
            <XCircleIcon className="h-6 w-6 text-error" />
          </div>
          <div className="timeline-end timeline-box group">
            <div className="flex flex-col">
              <span className="text-xs md:text-sm font-semibold">
                Waiting for agent in SG to accept request
              </span>
              <span className="text-xs group-hover:text-sm md:text-sm md:group-hover:text-base duration-200">
                Agent #5235623 sent cash to escrow
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
