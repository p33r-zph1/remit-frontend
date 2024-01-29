import Page from '../components/Page';
import TransferTimeline from '../components/Timeline/TransferTimeline';
import TransferDetailsNav from '../components/Nav/TransferDetailsNav';
import TransferMap from '../components/Location/MapsAPI';
import HeaderTitle from '../components/HeaderTitle';
import CalendarPopover from '../components/Popover/CalendarPopover';

export default function Transfer() {
  return (
    <Page className="mx-auto max-w-3xl">
      <TransferDetailsNav
        status="IN_PROGRESS"
        amount="12,497,549.47 PHP"
        recipient="123456789"
      />

      <div className="divider -mb-2 md:-mb-6" />

      <div>
        <HeaderTitle>Delivery</HeaderTitle>

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
      </div>

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
