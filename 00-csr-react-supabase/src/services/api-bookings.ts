import supabase from '@/services/api-supabase';
import { PAGE_SIZE } from '@/utils/constants';
import { getToday } from '@/utils/helpers';

// Type definitions
interface Filter {
  method: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte';
  field: string;
  value: any;
}

interface SortBy {
  field: string;
  direction: 'asc' | 'desc';
}

interface Booking {
  id: number;
  created_at: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  num_guests: number;
  status: string;
  total_price: number;
  cabins: { name: string }[];
  guests: { fullName: string; email: string }[];
}

interface GetBookingsResult {
  data: Booking[] | null;
  count: number | null;
}

// Get bookings with filtering, sorting, and pagination
export async function getBookings({
  filter,
  sortBy,
  page,
}: {
  filter?: Filter;
  sortBy?: SortBy;
  page?: number;
}): Promise<GetBookingsResult> {
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, start_date, end_date, num_nights, num_guests, status, total_price, cabins(name), guests(full_name, email)',
      { count: 'exact' },
    );

  // FILTER
  if (filter) query = query[filter.method || 'eq'](filter.field, filter.value);

  // SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return { data, count };
}

// Get a single booking by ID
export async function getBooking(id: number): Promise<Booking | null> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

// Get bookings created after the given date
export async function getBookingsAfterDate(date: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, total_price, extras_price')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Get stays created after the given date
export async function getStaysAfterDate(date: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Get stays with check-in or check-out today
export async function getStaysTodayActivity(): Promise<any[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, country_flag)')
    .or(
      `and(status.eq.unconfirmed,start_date.eq.${getToday()}),and(status.eq.checked-in,end_date.eq.${getToday()})`,
    )
    .order('created_at');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

// Update booking by ID
export async function updateBooking(
  id: number,
  obj: Record<string, any>,
): Promise<any> {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

// Delete booking by ID
export async function deleteBooking(id: number): Promise<any> {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
