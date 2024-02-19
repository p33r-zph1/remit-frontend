import { intervalToDuration, isAfter, isEqual } from 'date-fns';
import { useEffect, useState } from 'react';

type Props = {
  date: Date;
  onComplete?: () => void;
};

type CountdownState = {
  years: string;
  months: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isOver: boolean;
};

function formatTimeUnit(unit: number) {
  return String(unit).padStart(2, '0');
}

function isEqualOrAfter(now: Date, date: Date) {
  return isEqual(now, date) || isAfter(now, date);
}

export default function useCountdown({ date, onComplete }: Props) {
  const [state, setState] = useState<CountdownState>({
    years: '00',
    months: '00',
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    isOver: true,
  });

  useEffect(() => {
    if (isEqualOrAfter(new Date(), date)) {
      setState(prev => ({ ...prev, isOver: true }));
      return onComplete?.();
    }

    function updateCountdown() {
      const now = new Date();

      if (isEqualOrAfter(now, date)) {
        clearInterval(timer);

        setState(prev => ({ ...prev, isOver: true }));
        return onComplete?.();
      }

      const duration = intervalToDuration({ start: now, end: date });

      setState({
        years: formatTimeUnit(duration.years ?? 0),
        months: formatTimeUnit(duration.months ?? 0),
        days: formatTimeUnit(duration.days ?? 0),
        hours: formatTimeUnit(duration.hours ?? 0),
        minutes: formatTimeUnit(duration.minutes ?? 0),
        seconds: formatTimeUnit(duration.seconds ?? 0),
        isOver: false,
      });
    }

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [date, onComplete]);

  return state;
}
