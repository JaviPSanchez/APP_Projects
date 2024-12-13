import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { getBookings } from '@/services/api-bookings';
import { PAGE_SIZE } from '@/utils/constants';

interface Filter {
  field: string;
  value: string;
}

interface UseBookingsResult {
  isPending: boolean;
  error: any;
  bookings: Booking[] | undefined;
  count: number | undefined;
}

export function useBookings(): UseBookingsResult {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get('status');
  const filter: Filter | null =
    !filterValue || filterValue === 'all'
      ? null
      : { field: 'status', value: filterValue };

  // SORT
  const sortByRaw = searchParams.get('sortBy') || 'start_date-desc';
  const [field, direction] = sortByRaw.split('-');
  const sortBy: SortBy = { field, direction: direction as 'asc' | 'desc' };

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // QUERY
  const {
    isPending,
    data: { data: bookings, count } = { data: [], count: 0 },
    error,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isPending, error, bookings, count };
}
