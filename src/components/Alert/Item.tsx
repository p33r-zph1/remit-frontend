export type Alert = {
  title: string;
  desctiption: string;
  timestamp: string;
};

export default function AlertItem({ title, desctiption, timestamp }: Alert) {
  return (
    <div className="flex flex-row justify-between items-center py-4 group mb-2">
      {/* Title & Description */}
      <div className="flex items-center justify-start space-x-3 w-full">
        <div className="flex flex-col items-start justify-center mr-4">
          <div className="text-sm md:text-lg font-semibold max-w-sm transition group-hover:scale-105 duration-200">
            {title}
          </div>
          <div className="text-sm md:text-lg text-sleep-100 max-w-sm">
            {desctiption}
          </div>
        </div>
      </div>

      {/* Timestamp */}
      <pre className="font-sans text-sm md:text-lg text-sleep-200">
        {timestamp}
      </pre>
    </div>
  );
}
