import { useSuspenseQuery } from '@tanstack/react-query';

import TransactionItem from './Item';
import { historyQueryOptions } from '../../api/history/request';

export default function TransactionList() {
  const historyQuery = useSuspenseQuery(historyQueryOptions);
  const history = historyQuery.data;

  console.log({ history });

  // TODO: wip

  return (
    <>
      <TransactionItem
        recipient="1243455"
        status="SENT"
        sentAmount="12,497,549.47 SGD"
        conversionAmount="550,219.65 UA"
      />

      <TransactionItem
        recipient="1243455"
        status="IN_PROGRESS"
        sentAmount="12,497,549.47 SGD"
        conversionAmount="550,219.65 UA"
      />

      <TransactionItem
        recipient="1243455"
        status="COMPLETE"
        sentAmount="12,497,549.47 SGD"
        conversionAmount="550,219.65 UA"
      />

      <TransactionItem
        recipient="1243455"
        status="FAILED"
        sentAmount="12,497,549.47 SGD"
        conversionAmount="550,219.65 UA"
      />

      <TransactionItem
        recipient="1243455"
        status="EXPIRED"
        sentAmount="12,497,549.47 SGD"
        conversionAmount="550,219.65 UA"
      />
    </>
  );
}
