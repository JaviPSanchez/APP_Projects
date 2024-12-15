import { format, isToday } from 'date-fns';
import { Trash2, Eye, SquareArrowDown, SquareArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { ConfirmDelete } from '@/components/ui/confirm-delete';
import { Menus } from '@/components/ui/menus';
import { Modal } from '@/components/ui/modal';
import { Table } from '@/components/ui/table';
import { Tag } from '@/components/ui/tag';
import { useDeleteBooking } from '@/features/bookings/hooks/use-delete-bookings';
import { useCheckout } from '@/features/check-in-out/hooks/use-checkout';
import { formatCurrency, formatDistanceFromNow } from '@/utils/helpers';

// Define types for the props and the structure of the booking object
interface Guest {
  full_name: string;
  email: string;
}

interface Cabin {
  name: string;
}

interface Booking {
  id: string;
  created_at: string;
  start_date: string;
  end_date: string;
  num_nights: number;
  num_guests: number;
  total_price: number;
  status: 'unconfirmed' | 'checked-in' | 'checked-out';
  guests: Guest;
  cabins: Cabin;
}

interface BookingRowProps {
  booking: Booking;
}

// Corrected component definition using arrow function
const BookingRow: React.FC<BookingRowProps> = ({
  booking: {
    id: booking_id,
    start_date,
    end_date,
    num_nights,
    total_price,
    status,
    guests: { full_name: guest_name, email },
    cabins: { name: cabin_name },
  },
}) => {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  // Define the status to corresponding color mapping
  const statusToTagName: Record<string, 'blue' | 'green' | 'silver'> = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <Table.Row>
      <div className="font-sono text-[1.6rem] font-semibold text-color-grey-600">
        {cabin_name}
      </div>

      <div className="flex flex-col gap-1">
        <span className="first:font-medium">{guest_name}</span>
        <span className="last:text-lg last:text-color-grey-500">{email}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="first:font-medium">
          {isToday(new Date(start_date))
            ? 'Today'
            : formatDistanceFromNow(start_date)}{' '}
          &rarr; {num_nights} night stay
        </span>
        <span className="last:text-lg last:text-color-grey-500">
          {format(new Date(start_date), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(end_date), 'MMM dd yyyy')}
        </span>
      </div>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <div className="font-sono font-medium">{formatCurrency(total_price)}</div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={booking_id} />
          <Menus.List id={booking_id}>
            <Menus.Button
              icon={<Eye />}
              onClick={() => navigate(`/bookings/${booking_id}`)}
            >
              See details
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<SquareArrowDown />}
                onClick={() => navigate(`/checkin/${booking_id}`)}
              >
                Check in
              </Menus.Button>
            )}

            {status === 'checked-in' && (
              <Menus.Button
                icon={<SquareArrowUp />}
                onClick={() => checkout(booking_id)}
                disabled={isCheckingOut}
              >
                Check out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<Trash2 />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleting}
            onConfirm={() => deleteBooking(booking_id)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
};

export default BookingRow;
