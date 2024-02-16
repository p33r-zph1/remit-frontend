import AlertItem from '@/src/components/Item/AlertItem';

// import useAlerts from '@/src/hooks/api/useAlerts';

export default function AlertList() {
  // const alertsQuery = useAlerts();
  // const alerts = alertsQuery.data;

  // console.log({ alerts });

  // TODO: wip

  return (
    <>
      <AlertItem
        title="Delivery completed by Agent 3456567 (SG)"
        desctiption="Click here to transaction details"
        timestamp="2h ago"
      />

      <AlertItem
        title="Waiting for Agent 3456567 (SG) to deliver cash to recipient"
        desctiption="Click here to transaction details"
        timestamp="2h ago"
      />

      <AlertItem
        title="Waiting for agent in SG to accept request"
        desctiption="Click here to transaction details"
        timestamp="2h ago"
      />

      <AlertItem
        title="Give cash to agent"
        desctiption="Agent 5235623 to collect your cash on Nov 21 at Central Bangalore, 5-6pm"
        timestamp="2h ago"
      />

      <AlertItem
        title="Waiting for agent to accept order"
        desctiption="Click here to transaction details"
        timestamp="2h ago"
      />
    </>
  );
}
