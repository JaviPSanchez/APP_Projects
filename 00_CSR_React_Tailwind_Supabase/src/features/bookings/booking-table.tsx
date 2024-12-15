import { Empty } from '@/components/ui/empty';
import { Menus } from '@/components/ui/menus';
import { Pagination } from '@/components/ui/pagination';
import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import BookingRow from '@/features/bookings/booking-row';
import { useBookings } from '@/features/bookings/hooks/use-bookings';

// Hooks

function BookingTable() {
  const { bookings, isPending, count } = useBookings();

  if (isPending) return <Spinner />;

  if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={booking => <BookingRow key={booking.id} booking={booking} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
