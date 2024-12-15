import { Heading } from '@/components/ui/heading';
import { Row } from '@/components/ui/row';
import BookingTable from '@/features/bookings/booking-table';
import BookingTableOperations from '@/features/bookings/booking-table-operations';

export const Bookings: React.FC = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <Row>
        <BookingTable />
      </Row>
    </>
  );
};

export default Bookings;
