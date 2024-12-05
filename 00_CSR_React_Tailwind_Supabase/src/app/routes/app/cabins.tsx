// Cabins.tsx
import React from 'react';

import { Heading } from '@/components/ui/heading';
import { Row } from '@/components/ui/row';
import { AddCabin } from '@/features/cabins/add-cabin';
import { CabinTable } from '@/features/cabins/cabin-table';

export const Cabins: React.FC = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">All cabins</Heading>
        <p className="text-sm">Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
};

export default Cabins;
