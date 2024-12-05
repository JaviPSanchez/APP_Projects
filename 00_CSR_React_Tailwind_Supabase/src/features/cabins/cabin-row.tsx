import { Pencil, SquareStack, Trash2 } from 'lucide-react';

// Components
import { ConfirmDelete } from '@/components/ui/confirm-delete';
import { Menus } from '@/components/ui/menus';
import { Modal } from '@/components/ui/modal';
import { Table } from '@/components/ui/table';
import { CreateCabinForm } from '@/features/cabins/create-cabin-form';
// Hooks
import { useCreateCabin } from '@/features/cabins/hooks/use-create-cabin';
import { useDeleteCabin } from '@/features/cabins/hooks/use-delete-cabin';
// Types
import { Cabin } from '@/features/cabins/types';
// Utils
import { formatCurrency } from '@/utils/format';

interface CabinRowProps {
  cabin: Cabin;
}

export const CabinRow: React.FC<CabinRowProps> = ({ cabin }) => {
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  const {
    id: cabin_id,
    name,
    max_capacity,
    regular_price,
    discount = 0,
    image,
    description = '',
  } = cabin;

  function handleDuplicate() {
    let processedImage: File | null = null;

    if (typeof image === 'string') {
      // Handle the string case; if you can't convert it to File, decide what to do
      console.error(
        'Image URL cannot be converted to File. Handle accordingly.',
      );
    } else if (image instanceof File) {
      processedImage = image; // Directly use the File
    } else {
      console.error('Image is undefined or of an unexpected type.');
    }

    // Use default values if the properties are undefined
    const maxCapacity = max_capacity ?? 0;
    const regularPrice = regular_price ?? 0;
    const discountValue = discount ?? 0;

    if (processedImage) {
      // Proceed if image is successfully processed
      createCabin({
        newCabin: {
          name: `Copy of ${name}`,
          max_capacity: maxCapacity,
          regular_price: regularPrice,
          discount: discountValue,
          image: processedImage,
          description,
        },
      });
    }
  }

  const imageUrl =
    typeof image === 'string'
      ? image
      : image instanceof File
        ? URL.createObjectURL(image)
        : '';

  // Ensure cabin_id is a string
  const id = cabin_id ?? ''; // Provide a default empty string if cabin_id is undefined

  return (
    <Table.Row>
      <img
        className="aspect-3/2 w-[6.4rem] rounded-md object-center"
        src={imageUrl}
        alt={`Cabin ${name}`}
      />
      <div className="font-sono text-2xl font-semibold text-color-grey-600">
        {name}
      </div>
      <div>Fits up to {max_capacity} guests</div>
      <div className="font-sono font-semibold">
        {formatCurrency(regular_price)}
      </div>
      {discount ? (
        <div className="font-sono text-color-green-700">
          {formatCurrency(discount)}
        </div>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Menus.Menu className="bg-pink-400">
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Menus.Button icon={<SquareStack />} onClick={handleDuplicate}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens="edit">
                <Menus.Button icon={<Pencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<Trash2 />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabin_id)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
};
