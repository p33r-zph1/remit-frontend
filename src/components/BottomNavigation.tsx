import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { BellAlertIcon } from '@heroicons/react/24/outline';

export default function BottomNavigation() {
  return (
    <div className="btm-nav btm-nav-sm max-w-xs mx-auto md:btm-nav-md md:hidden">
      <button className="text-primary font-bold">
        <ArrowUpCircleIcon className="h-6 w-6 text-primary" />
        <span className="btm-nav-label">Home</span>
      </button>
      <button>
        <ChatBubbleLeftIcon className="h-6 w-6 text-gray-500" />
        <span className="btm-nav-label">History</span>
      </button>
      <button>
        <BellAlertIcon className="h-6 w-6 text-gray-500" />
        <span className="btm-nav-label">Alerts</span>
      </button>
    </div>
  );
}
