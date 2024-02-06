import { QrCodeIcon } from '@heroicons/react/20/solid';

import HeaderTitle from '../../components/HeaderTitle';

type Props =
  | {
      key: 'customer';
      senderAgentId: string;
    }
  | {
      key: 'agent';
      collectionMessage: string;
    };

export default function CollectionMeetup(props: Props) {
  const { key } = props;

  return (
    <>
      <HeaderTitle className="text-xl md:text-2xl">
        {key === 'customer' && (
          <>Collect cash from Agent {props.senderAgentId}</>
        )}

        {key === 'agent' && props.collectionMessage}
      </HeaderTitle>

      <div className="flex flex-col space-y-2">
        <button
          type="submit"
          className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
          // disabled={order.}
        >
          <QrCodeIcon className="h-6 w-6" />
          {key === 'customer' && 'Show QR'}
          {key === 'agent' && 'Scan QR'}
        </button>

        <button
          type="submit"
          className="btn btn-outline btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
          // disabled={order.}
        >
          Contact {key === 'customer' && 'agent'}
          {key === 'agent' && 'recipient'}
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
