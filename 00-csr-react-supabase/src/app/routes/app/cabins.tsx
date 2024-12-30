// Cabins.tsx
import React from 'react';

import { Heading } from '@/components/ui/heading';
import { Row } from '@/components/ui/row';
import { AddCabin } from '@/features/cabins/add-cabin';
import { CabinTable } from '@/features/cabins/cabin-table';
import CabinTableOperations from '@/features/cabins/cabin-table-operations';

export const Cabins: React.FC = () => {
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">All cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
};

export default Cabins;
