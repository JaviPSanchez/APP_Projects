import { Heading } from '@/components/ui/heading';
import { Row } from '@/components/ui/row';
import BookingTable from '@/features/bookings/booking-table';

export const Bookings: React.FC = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">All bookings</Heading>
        <p>TEST</p>
      </Row>

      <Row>
        <BookingTable />
      </Row>
    </>
  );
};

export default Bookings;
