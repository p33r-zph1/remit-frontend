import { differenceInDays, formatDistance, formatRelative } from 'date-fns';
import { z } from 'zod';

function dateParser(date: Date | number | string) {
  return z.coerce.date().safeParse(date);
}

export function safeFormatRelative(
  date: Date | number | string,
  baseDate: Date | number | string = Date.now()
) {
  const dateResult = dateParser(date);
  const baseDateResult = dateParser(baseDate);

  if (!dateResult.success || !baseDateResult.success) return undefined;

  return formatRelative(dateResult.data, baseDateResult.data);
}

export function safeFormatDistance(
  date: Date | number | string,
  baseDate: Date | number | string = Date.now()
) {
  const dateResult = dateParser(date);
  const baseDateResult = dateParser(baseDate);

  if (!dateResult.success || !baseDateResult.success) return undefined;

  return formatDistance(dateResult.data, baseDateResult.data);
}

export function safeFormatRelativeDistance(
  startDate: Date | number | string,
  endDate: Date | number | string = Date.now()
) {
  const startDateResult = dateParser(startDate);
  const endDateResult = dateParser(endDate);

  if (!startDateResult.success || !endDateResult.success) return undefined;

  const daysDifference = differenceInDays(startDateResult.data, Date.now());

  if (Math.abs(daysDifference) >= 6) {
    return formatRelative(startDateResult.data, Date.now());
  }

  return `${formatRelative(
    startDateResult.data,
    Date.now()
  )} for ${formatDistance(startDateResult.data, endDateResult.data)}`;
}
