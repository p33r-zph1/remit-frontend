import { PhoneIcon } from '@heroicons/react/20/solid';
import HeaderTitle from '../../components/HeaderTitle';
import CustomerMeetup from '../Meetup/CustomerMeetup';
import useOrderDetails from '../../hooks/useOrderDetails';

export default function GiveCash() {
  const {
    order: { senderAgentId, collectionDetails },
  } = useOrderDetails();

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

      <CustomerMeetup collectionDetails={collectionDetails} />
    </>
  );
}
