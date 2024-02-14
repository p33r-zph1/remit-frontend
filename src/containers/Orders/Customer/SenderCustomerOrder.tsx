import type { TransferTimelineStatus } from '@/src/schema/order';

import GiveCash from '../GiveCash';

type Props = {
  status: TransferTimelineStatus;
};

export default function SenderOrder({ status }: Props) {
  switch (status) {
    case 'COLLECTION_MEETUP_SET':
      return <GiveCash />;

    default:
      return null;
  }
}
