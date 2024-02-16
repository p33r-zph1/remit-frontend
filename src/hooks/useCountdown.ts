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
};

function formatTimeUnit(unit: number) {
  return String(unit).padStart(2, '0');
}

export default function useCountdown({ date, onComplete }: Props) {
  const [state, setState] = useState<CountdownState>({
    years: '00',
    months: '00',
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    function updateCountdown() {
      const now = new Date();

      if (isEqual(now, date) || isAfter(now, date)) {
        clearInterval(timer);
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
      });
    }

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [date, onComplete]);

  return state;
}
