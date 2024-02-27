import { Fragment } from 'react';

import EmptyHistory from '@/src/components/Empty/EmptyHistory';
import HistoryItem from '@/src/components/Item/HistoryItem';
import useGetOrders from '@/src/hooks/api/useGetOrders';
import useAuth from '@/src/hooks/useAuth';

import EmptyOrder from '../components/Empty/EmptyOrder';
import { getRecipient, isUserRecipient } from '../schema/order';
import { getRecipientTransferDetails } from '../schema/order/transfer-details';

export default function HistoryList() {
  const { user: userId, hasGroup } = useAuth();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetOrders(
    {
      pageSize: 10,
    }
  );

  if (data.pages.every(page => page.data.orders.length === 0)) {
    return <EmptyHistory isCustomer={hasGroup('customer')} />;
  }

  return (
    <>
      {data.pages.map(({ data: { orders, pageNumber } }) => (
        <Fragment key={pageNumber}>
          {orders.map(order => {
            const {
              orderId,
              orderStatus,
              transferTimelineStatus: timelineStatus,
              createdAt,
              transferDetails,
            } = order;

            return (
              <HistoryItem
                key={orderId}
                orderId={orderId}
                orderStatus={orderStatus}
                timelineStatus={timelineStatus}
                transferInfo={getRecipientTransferDetails(transferDetails)}
                createdAt={createdAt}
                recipientId={getRecipient(order)}
                isRecipient={isUserRecipient(order, userId)}
              />
            );
          })}
        </Fragment>
      ))}

      {hasNextPage ? (
        <button
          onClick={() => fetchNextPage()}
          className="btn btn-ghost btn-primary btn-sm btn-wide mx-auto my-4 rounded-lg text-base font-bold shadow-sm md:btn-md disabled:bg-primary/70 disabled:text-primary-content"
          type="button"
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage && (
            <span className="loading loading-bars text-primary-content"></span>
          )}
          Load more
        </button>
      ) : (
        <EmptyOrder title="You've reached the end" />
      )}
    </>
  );
}
