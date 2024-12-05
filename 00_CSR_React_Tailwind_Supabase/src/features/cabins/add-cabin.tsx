import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { CreateCabinForm } from '@/features/cabins/create-cabin-form';

// import { CabinTable } from './cabin-table';

export const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open opens="new-cabin">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="new-cabin">
        <CreateCabinForm />
      </Modal.Window>
      {/* We can add more Modals */}
      {/* <Modal.Open opens="table">
        <Button>Show Table</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CabinTable />
      </Modal.Window> */}
    </Modal>
  );
};
