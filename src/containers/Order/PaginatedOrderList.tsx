import { Fragment, type ReactNode } from 'react';

import ErrorAlert from '@/src/components/Alert/ErrorAlert';
import EmptyHistory from '@/src/components/Empty/EmptyHistory';
import EmptyOrder from '@/src/components/Empty/EmptyOrder';
import HeaderRefresh from '@/src/components/Header/HeaderRefresh';
import OrderItem from '@/src/components/Item/OrderItem';
import useInfiniteOrders, {
  type InfiniteOrdersQueryProps,
} from '@/src/hooks/api/useInfiniteOrders';
import useAuth from '@/src/hooks/useAuth';
import {
  getOrderDetails,
  getRecipient,
  isUserRecipient,
  isUserRecipientAgent,
} from '@/src/schema/order';

type Props = InfiniteOrdersQueryProps & {
  renderTitle: ReactNode;
};

export default function PaginatedOrderList({
  renderTitle,
  ...queryProps
}: Props) {
  const { user: userId, hasGroup } = useAuth();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isError,
    refetch,
    isFetching,
  } = useInfiniteOrders(queryProps);

  if (data.pages.every(page => page.data.orders.length === 0)) {
    return (
      <>
        <HeaderRefresh
          renderTitle={renderTitle}
          isFetching={isFetching}
          refetch={refetch}
        />

        <EmptyHistory isCustomer={hasGroup('customer')} />
      </>
    );
  }

  return (
    <>
      <HeaderRefresh
        renderTitle={renderTitle}
        isFetching={isFetching}
        refetch={refetch}
      />

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

            const isComputed = hasGroup('customer')
              ? isRecipient
              : isRecipientAgent;

            return (
              <OrderItem
                key={orderId}
                orderId={orderId}
                orderStatus={orderStatus}
                timelineStatus={timelineStatus}
                orderDetails={{ ...orderDetails, isComputed }}
                createdAt={createdAt}
                recipientId={recipientId}
                isRecipient={isRecipient}
                disabled={isFetching}
              />
            );
          })}
        </Fragment>
      ))}

      {error && <ErrorAlert message={error.message} />}

      {hasNextPage ? (
        <button
          onClick={() => fetchNextPage()}
          className="btn btn-ghost btn-primary btn-sm btn-wide mx-auto my-4 rounded-lg text-sm font-bold shadow-sm md:btn-md disabled:bg-primary/70 disabled:text-primary-content md:text-base"
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
