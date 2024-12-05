// Bookings.tsx
import React from 'react';

import { Heading } from '@/components/ui/heading';
import { Row } from '@/components/ui/row';

export const Bookings: React.FC = () => {
  return (
    <div className="flex p-4">
      <Heading type="h1">DASHBOARD</Heading>
      <Row>
        <p>Bookings</p>
      </Row>
    </div>
  );
};

export default Bookings;
