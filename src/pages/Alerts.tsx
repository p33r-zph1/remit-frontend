export function EmptyAlert() {
  return (
    <div className="flex-1 flex justify-center items-center text-sleep-100 text-lg text-center px-8 py-16">
      <span>
        No alerts yet. Maybe it’s time to{' '}
        <a className="link text-primary decoration-black underline font-semibold">
          send
        </a>{' '}
        some money?
      </span>
    </div>
  );
}

type Alert = {
  title: string;
  desctiption: string;
  timestamp: string;
};

export function AlertItem({ title, desctiption, timestamp }: Alert) {
  return (
    <div className="flex flex-row justify-between items-center py-4 group mb-2">
      {/* Title & Description */}
      <div className="flex items-center justify-center space-x-3">
        <div className="flex flex-col items-start justify-center">
          <div className="text-sm md:text-lg font-semibold max-w-sm transition group-hover:scale-105 duration-200">
            {title}
          </div>
          <div className="text-sm md:text-lg text-sleep-100 max-w-sm">
            {desctiption}
          </div>
        </div>
      </div>

      {/* Timestamp */}
      <div className="text-sm md:text-lg text-sleep-200">{timestamp}</div>
    </div>
  );
}

export default function Alerts() {
  return (
    <div className="flex-1 w-full flex flex-col px-6 py-2 sm:max-w-3xl sm:mx-auto">
      <h1 className="text-xl font-semibold mt-14 mb-16 md:text-2xl md:text-center">
        Alerts
      </h1>

      {/* TODO: use component below  */}
      {/* <EmptyAlert /> */}

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
    </div>
  );
}
