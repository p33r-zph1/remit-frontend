import { Fragment } from 'react';

import EmptyHistory from '@/src/components/Empty/EmptyHistory';
import HistoryItem from '@/src/components/Item/HistoryItem';
import useOrders from '@/src/hooks/api/useOrders';
import useAuth from '@/src/hooks/useAuth';

import EmptyOrder from '../components/Empty/EmptyOrder';

export default function HistoryList() {
  const { user, hasGroup } = useAuth();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useOrders({
    pageSize: 10,
  });

  if (data.pages.every(page => page.data.orders.length === 0)) {
    return <EmptyHistory isCustomer={hasGroup('customer')} />;
  }

  return (
    <>
      {data.pages.map(({ data: { orders, pageNumber } }) => (
        <Fragment key={pageNumber}>
          {orders.map(order => (
            <HistoryItem
              {...order}
              key={order.orderId}
              isRecipient={user === order.recipientId}
            />
          ))}
        </Fragment>
      ))}

      {hasNextPage ? (
        <button
          onClick={() => fetchNextPage()}
          className="btn btn-primary btn-sm btn-wide mx-auto my-4 rounded-lg text-base font-semibold shadow-sm md:btn-md md:btn-block disabled:bg-primary/70 disabled:text-primary-content"
          type="button"
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage && <span className="loading loading-bars"></span>}
          Load more
        </button>
      ) : (
        <EmptyOrder title="You've reached the end" />
      )}
    </>
  );
}
