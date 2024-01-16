import { ElementType } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { BellAlertIcon } from '@heroicons/react/24/outline';

import { cx } from '../utils';

type LinkItem = {
  title: string;
  isActive: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ElementType<any>;
};

function BtmLink({ title, isActive, icon: Icon }: LinkItem) {
  return (
    <>
      <Icon className={cx('h-6 w-6', isActive ? 'text-primary' : '')} />
      <span className="btm-nav-label">{title}</span>
    </>
  );
}

export default function BottomNavigation() {
  return (
    <>
      {/* White Background Filler */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white md:hidden" />

      {/* Bottom Navigation */}
      <div className="btm-nav btm-nav-sm max-w-xs mx-auto md:btm-nav-md md:hidden font-bold">
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
    </>
  );
}
