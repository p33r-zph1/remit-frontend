import { useSuspenseQuery } from '@tanstack/react-query';

import { historyQueryOptions } from '../../api/history.api';
import TransactionItem from './Item';

export default function TransactionList() {
  const historyQuery = useSuspenseQuery(historyQueryOptions);
  const history = historyQuery.data;

  console.log([history]);

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
