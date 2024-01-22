import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Link } from '@tanstack/react-router';

import TransferTimeline from '../components/Transfer/Timeline';
import TransferDetails from '../components/Transfer/Details';
import Page from '../components/Page';

function BackButton() {
  return (
    <Link to="/" className="btn btn-circle btn-ghost -ml-3 mb-2 mt-6 sm:mt-16">
      <ArrowLeftIcon className="h-4 w-4 text-black md:h-6 md:w-6" />
    </Link>
  );
}

export default function Transfer() {
  return (
    <Page className="mx-auto max-w-3xl">
      <BackButton />

      <TransferDetails
        status="IN_PROGRESS"
        amount="12,497,549.47 PHP"
        recipient="123456789"
      />

      <TransferTimeline
        timeline={[
          {
            title: 'Today at 4:23pm',
            description: 'You set up your transfer',
            status: 'COMPLETE',
          },
          {
            title: 'Today at 6:76pm',
            description: 'Agent #5235623 collected your cash',
            status: 'COMPLETE',
          },
          {
            title: 'Waiting for agent in SG to accept request',
            description: 'Agent #5235623 sent cash to escrow',
            status: 'IN_PROGRESS',
          },
        ]}
      />
    </Page>
  );
}
