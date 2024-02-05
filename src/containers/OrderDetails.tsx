import { useMemo } from 'react';
import {
  CurrencyDollarIcon,
  PhoneIcon,
  QrCodeIcon,
} from '@heroicons/react/20/solid';

import { Route } from '../routes/_auth.transfer.$orderId';
import useAuth from '../hooks/useAuth';
import useOrder from '../hooks/api/useOrder';

import AcceptOrderForm from './AcceptOrderForm';
// import TransferMap from '../components/Location/MapsAPI';
// import HeaderTitle from '../components/HeaderTitle';
import TransferTimeline from '../components/Timeline/TransferTimeline';
import TransferDetailsNav from '../components/Nav/TransferDetailsNav';
import HeaderTitle from '../components/HeaderTitle';
// import CalendarPopover from '../components/Popover/CalendarPopover';

export default function OrderDetails() {
  const { user, hasGroup } = useAuth();

  const { orderId } = Route.useParams();

  const { data: order } = useOrder({ orderId });

  // console.log({ group, timelineStatus: order.transferTimelineStatus });

  const isSender = useMemo(
    () => user === order.senderId,
    [order.senderId, user]
  );

  const isSenderAgent = useMemo(
    () => user === order.senderAgentId && hasGroup('agent'),
    [hasGroup, order.senderAgentId, user]
  );

  const isRecipient = useMemo(
    () => user === order.recipientId,
    [order.recipientId, user]
  );

  const isRecipientAgent = useMemo(
    () => user === order.recipientAgentId && hasGroup('agent'),
    [hasGroup, order.recipientAgentId, user]
  );

  return (
    <>
      <TransferDetailsNav {...order} isRecipient={isRecipient} />

      <div className="divider -mb-2 md:-mb-6" />

      {!isSender && order.transferTimelineStatus === 'PENDING' && (
        // {true && (
        <AcceptOrderForm
          orderId={orderId}
          countryIsoCode={order.transferDetails.recipient.countryIsoCode}
        />
      )}

      {isRecipientAgent && order.transferTimelineStatus === 'PENDING' && (
        // {true && (
        <>
          <span className="text-gray-400">
            Your commission at {order.fees.recipientAgentCommission}%
          </span>

          <div className="flex flex-col space-y-4">
            <span className="text-xl font-bold md:text-2xl">~ 748.10 USDT</span>

            <button
              // type="submit"
              className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
            >
              Take order
            </button>

            <button
              type="button"
              className="btn btn-outline btn-error btn-block rounded-full text-xl font-semibold shadow-sm"
            >
              Reject order
            </button>
          </div>
        </>
      )}

      {order.transferTimelineStatus === 'RECIPIENT_ACCEPTED' && (
        <div className="text-2xl">Recipient accepted</div>
      )}

      {order.transferTimelineStatus === 'RECIPIENT_REJECTED' && (
        <div className="text-2xl">Recipient rejected</div>
      )}

      {order.transferTimelineStatus === 'SENDER_AGENT_ACCEPTED' && (
        <div className="text-2xl">Sender agent accepted</div>
      )}

      {order.transferTimelineStatus === 'SENDER_AGENT_REJECTED' && (
        <div className="text-2xl">Sender agent rejected</div>
      )}

      {isSender &&
        order.transferTimelineStatus === 'RECIPIENT_AGENT_ACCEPTED' && (
          // {true && (
          <>
            <HeaderTitle className="text-xl md:text-2xl">
              Give cash to Agent {order.senderAgentId}
            </HeaderTitle>

            <button
              type="submit"
              className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
              // disabled={order.}
            >
              <PhoneIcon className="h-6 w-6" />
              Contact agent
            </button>

            {/* TODO: display more details (meetup area, etc.) */}
          </>
        )}

      {order.transferTimelineStatus === 'RECIPIENT_AGENT_REJECTED' && (
        <div className="text-2xl">Recipient agent rejected</div>
      )}

      {isRecipient &&
        order.transferTimelineStatus === 'COLLECTION_MEETUP_SET' && (
          // {true && (
          <>
            <HeaderTitle className="text-xl md:text-2xl">
              Collect cash from Agent {order.senderAgentId}
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
        )}

      {isSenderAgent &&
        order.transferTimelineStatus === 'DELIVERY_MEETUP_SET' && (
          // {true && (
          <>
            <HeaderTitle className="text-xl md:text-2xl">
              Collect cash on Nov 21 at Central Abu Dhabi, 5-6 pm
            </HeaderTitle>

            <div className="flex flex-col space-y-2">
              <button
                type="submit"
                className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
                // disabled={order.}
              >
                <CurrencyDollarIcon className="h-6 w-6" />
                Cash collected
              </button>

              <button
                type="submit"
                className="btn btn-outline btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
                // disabled={order.}
              >
                Contact sender
              </button>
            </div>
          </>
        )}

      {order.transferTimelineStatus === 'CASH_COLLECTED' && (
        // {true && (
        <>
          <HeaderTitle className="text-xl md:text-2xl">
            Send USDT 148,721.63 (AED) 550,219.65 to escrow
          </HeaderTitle>

          <div className="flex flex-col space-y-2">
            <button
              type="submit"
              className="btn btn-primary btn-block rounded-full text-xl font-semibold shadow-sm disabled:bg-primary/70 disabled:text-primary-content"
              // disabled={order.}
            >
              <img
                src="/metamask.png"
                alt="metamask icon"
                className="h-8 w-8"
              />
              Transfer
            </button>
          </div>
        </>
      )}

      {/* {order.transferTimelineStatus === 'CASH_COLLECTED' && (
        <div className="text-2xl">{order.transferTimelineStatus}</div>
      )} */}

      {/* <div>
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
      </div> */}

      <TransferTimeline timeline={order.transferTimeline} />
    </>
  );
}
