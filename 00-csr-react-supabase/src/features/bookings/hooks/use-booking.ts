import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getBooking } from '@/services/api-bookings';

// Define types for the booking and query result
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

interface UseBookingResult {
  isPending: boolean;
  error: unknown;
  booking: Booking | null;
}

export function useBooking(): UseBookingResult {
  const { bookingId } = useParams<{ bookingId: string }>();

  const {
    isPending,
    data: booking,
    error,
  } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(booking_id),
    retry: false,
  });

  return { isPending, error, booking };
}
