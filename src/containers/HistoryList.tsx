import { Fragment } from 'react';

import EmptyHistory from '@/src/components/Empty/EmptyHistory';
import HistoryItem from '@/src/components/Item/HistoryItem';
import useGetOrders from '@/src/hooks/api/useGetOrders';
import useAuth from '@/src/hooks/useAuth';

import ErrorAlert from '../components/Alert/ErrorAlert';
import EmptyOrder from '../components/Empty/EmptyOrder';
import {
  getOrderDetails,
  getRecipient,
  isUserRecipient,
  isUserRecipientAgent,
} from '../schema/order';

export default function HistoryList() {
  const { user: userId, hasGroup } = useAuth();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isError,
  } = useGetOrders({
    pageSize: 10,
  });

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
            } = order;

            const recipientId = getRecipient(order);
            const isRecipient = isUserRecipient(order, userId);
            const isRecipientAgent = isUserRecipientAgent(order, userId);

            const orderDetails = getOrderDetails(
              order,
              isRecipient,
              isRecipientAgent
            );

            return (
              <HistoryItem
                key={orderId}
                orderId={orderId}
                orderStatus={orderStatus}
                timelineStatus={timelineStatus}
                orderDetails={orderDetails}
                createdAt={createdAt}
                recipientId={recipientId}
                isRecipient={isRecipient}
              />
            );
          })}
        </Fragment>
      ))}

      {error && <ErrorAlert message={error.message} />}

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
          {isError ? 'Try again' : 'Load more'}
        </button>
      ) : (
        <EmptyOrder title="You've reached the end" />
      )}
    </>
  );
}
