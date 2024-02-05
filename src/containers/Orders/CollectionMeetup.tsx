import { QrCodeIcon } from '@heroicons/react/20/solid';

import HeaderTitle from '../../components/HeaderTitle';

type Props = {
  senderAgentId: string;
};

export default function CollectionMeetup({ senderAgentId }: Props) {
  return (
    <>
      <HeaderTitle className="text-xl md:text-2xl">
        Collect cash from Agent {senderAgentId}
      </HeaderTitle>

      <div className="flex flex-col space-y-2">
        <button
          type="submit"
          className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
          // disabled={order.}
        >
          <QrCodeIcon className="h-6 w-6" />
          Show QR
        </button>

        <button
          type="submit"
          className="btn btn-outline btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
          // disabled={order.}
        >
          Contact agent
        </button>
      </div>

      {/* TODO: display more details (meetup area, etc.) */}
    </>
  );
}
