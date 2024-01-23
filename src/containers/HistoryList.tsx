import HistoryItem from '../components/Item/HistoryItem';

// import useHistory from '../hooks/api/useHistory';

export default function HistoryList() {
  // const historyQuery = useHistory();
  // const history = historyQuery.data;

  // console.log({ history });

  // TODO: wip

  return (
    <>
      <HistoryItem
        recipient="1243455"
        status="SENT"
        sentAmount="12,497,549.47 SGD"
        conversionAmount="550,219.65 UA"
      />

      <HistoryItem
        recipient="1243455"
        status="IN_PROGRESS"
        sentAmount="12,497,549.47 SGD"
        conversionAmount="550,219.65 UA"
      />

      <HistoryItem
        recipient="1243455"
        status="COMPLETE"
        sentAmount="12,497,549.47 SGD"
        conversionAmount="550,219.65 UA"
      />

      <HistoryItem
        recipient="1243455"
        status="FAILED"
        sentAmount="12,497,549.47 SGD"
        conversionAmount="550,219.65 UA"
      />

      <HistoryItem
        recipient="1243455"
        status="EXPIRED"
        sentAmount="12,497,549.47 SGD"
        conversionAmount="550,219.65 UA"
      />
    </>
  );
}
