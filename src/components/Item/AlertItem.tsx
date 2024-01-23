export type Alert = {
  title: string;
  desctiption: string;
  timestamp: string;
};

export default function AlertItem({ title, desctiption, timestamp }: Alert) {
  return (
    <div className="group mb-2 flex flex-row items-center justify-between py-4">
      {/* Title & Description */}
      <div className="flex w-full items-center justify-start space-x-3">
        <div className="mr-4 flex flex-col items-start justify-center">
          <div className="max-w-sm text-sm font-semibold transition duration-200 group-hover:scale-105 md:text-lg">
            {title}
          </div>
          <div className="max-w-sm text-sm text-sleep-100 md:text-lg">
            {desctiption}
          </div>
        </div>
      </div>

      {/* Timestamp */}
      <pre className="font-sans text-sm text-sleep-200 md:text-lg">
        {timestamp}
      </pre>
    </div>
  );
}
