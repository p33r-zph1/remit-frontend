import { QrCodeIcon } from '@heroicons/react/20/solid';

import HeaderTitle from '../../components/HeaderTitle';

type Props =
  | {
      group: 'customer';
      senderAgentId: string;
    }
  | {
      group: 'agent';
      collectionMessage: string;
    };

export default function CollectionMeetup(props: Props) {
  const { group } = props;

  console.log({ group });

  return (
    <>
      <HeaderTitle className="text-xl md:text-2xl">
        {group === 'customer' && (
          <>Collect cash from Agent {props.senderAgentId}</>
        )}

        {group === 'agent' && props.collectionMessage}
      </HeaderTitle>

      <div className="flex flex-col space-y-2">
        <button
          type="submit"
          className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
          // disabled={order.}
        >
          <QrCodeIcon className="h-6 w-6" />
          {group === 'customer' && 'Show QR'}
          {group === 'agent' && 'Scan QR'}
        </button>

        <button
          type="submit"
          className="btn btn-outline btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
          // disabled={order.}
        >
          Contact {group === 'customer' && 'agent'}
          {group === 'agent' && 'recipient'}
        </button>
      </div>

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
