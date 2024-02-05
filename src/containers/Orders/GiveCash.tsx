import { PhoneIcon } from '@heroicons/react/20/solid';
import HeaderTitle from '../../components/HeaderTitle';

type Props = {
  senderAgentId: string;
};

export default function GiveCash({ senderAgentId }: Props) {
  return (
    <>
      <HeaderTitle className="text-xl md:text-2xl">
        Give cash to Agent {senderAgentId}
      </HeaderTitle>

      <button
        type="button"
        className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
      >
        <PhoneIcon className="h-6 w-6" />
        Contact agent
      </button>

      {/* <div>
        <div>
          <div className="text-sm font-semibold text-gray-400">
            Set delivery date and time
          </div>

          <CalendarPopover />
        </div>

        <div>
          <div className="text-sm font-semibold text-gray-400">
            Set delivery area
          </div>

          <TransferMap />
        </div>
      </div> */}
    </>
  );
}
