import { type ElementType } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { BellAlertIcon } from '@heroicons/react/24/outline';
import { twMerge } from 'tailwind-merge';

type LinkItem = {
  title: string;
  isActive: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ElementType<any>;
};

function BtmLink({ title, isActive, icon: Icon }: LinkItem) {
  return (
    <>
      <Icon className={twMerge('h-6 w-6', isActive ? 'text-primary' : '')} />
      <span className="btm-nav-label">{title}</span>
    </>
  );
}

export default function BottomNavigation() {
  return (
    <footer>
      {/* White Background Filler */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white lg:hidden" />

      {/* Bottom Navigation */}
      <div className="btm-nav btm-nav-sm mx-auto max-w-xs font-bold lg:btm-nav-md lg:hidden">
        <Link to="/" activeProps={{ className: 'text-primary' }}>
          {({ isActive }) => (
            <BtmLink
              title="Home"
              isActive={isActive}
              icon={ArrowUpCircleIcon}
            />
          )}
        </Link>

        <Link to="/history" activeProps={{ className: 'text-primary' }}>
          {({ isActive }) => (
            <BtmLink
              title="History"
              isActive={isActive}
              icon={ChatBubbleLeftIcon}
            />
          )}
        </Link>

        <Link to="/alerts" activeProps={{ className: 'text-primary' }}>
          {({ isActive }) => (
            <BtmLink title="Alerts" isActive={isActive} icon={BellAlertIcon} />
          )}
        </Link>
      </div>
    </footer>
  );
}
