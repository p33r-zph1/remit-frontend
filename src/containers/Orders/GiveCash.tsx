import { PhoneIcon } from '@heroicons/react/20/solid';
import HeaderTitle from '../../components/HeaderTitle';
import CustomerMeetup from '../Meetup/CustomerMeetup';
import useOrderDetails from '../../hooks/useOrderDetails';

export default function GiveCash() {
  const {
    order: { senderAgentId, collectionDetails },
  } = useOrderDetails();

  if (!collectionDetails) throw new Error('Collection details is not present.');

  return (
    <div className="flex flex-col space-y-12">
      <div>
        <HeaderTitle className="text-xl md:text-2xl">
          Give cash to Agent #{senderAgentId}
        </HeaderTitle>

        <button
          type="button"
          className="btn btn-primary btn-block rounded-full text-base
font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content md:text-lg"
        >
          <PhoneIcon className="h-6 w-6" />
          Contact agent
        </button>
      </div>

      <CustomerMeetup collectionDetails={collectionDetails} />
    </div>
  );
}
