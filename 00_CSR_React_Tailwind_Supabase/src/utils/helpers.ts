import { formatDistance, parseISO, differenceInDays } from 'date-fns';

// Type annotations for the function parameters
export const subtractDates = (
  dateStr1: string | Date,
  dateStr2: string | Date,
): number =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

// Ensure the date string passed is a string
export const formatDistanceFromNow = (dateStr: string): string =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

// Typing the options parameter as an object with an optional boolean property `end`
export const getToday = (options?: { end?: boolean }): string => {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it is not at 0.0.0.0, so we need to set the date to be the END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);

  return today.toISOString();
};

// Typing the value parameter as a number for the currency formatter
export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value,
  );
