// import { default as dayjs } from 'dayjs';
import { formatDistance, parseISO, differenceInDays } from 'date-fns';

// export const formatDate = (date: number) =>
//   dayjs(date).format('MMMM D, YYYY h:mm A');

export function formatCurrency(value: string | number) {
  // Convert the value to a number if it's a string
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'EUR',
  }).format(numericValue);
}

export function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));
}

export function calcMinutesLeft(dateStr: string) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}

// https://uibakery.io/regex-library/phone-number
export function checkPhone(input: number | string) {
  // Convert input to string if it's a number
  const stringValue = typeof input === 'number' ? input.toString() : input;

  const isValidPhone =
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
      stringValue,
    );
  return isValidPhone;
}

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1: number, dateStr2: number) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr: string): string =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In');

interface GetTodayOptions {
  end?: boolean; // Make 'end' property optional and of type boolean
}

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options: GetTodayOptions = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};
