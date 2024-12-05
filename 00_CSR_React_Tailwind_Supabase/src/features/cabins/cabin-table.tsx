// Components
import { Menus } from '@/components/ui/menus';
import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { CabinRow } from '@/features/cabins/cabin-row';
// Hooks
import { useCabins } from '@/features/cabins/hooks/use-cabins';

export const CabinTable = () => {
  const { cabins, isPending } = useCabins();

  if (isPending) return <Spinner />;

  // Handle the case where cabins might be undefined
  if (!cabins || cabins.length === 0) {
    return <div>No cabins available</div>; // Custom message
  }

  return (
    <Menus>
      <Table columns="9.6rem 0.8fr 2fr 1fr 1fr 5.2rem">
        <Table.Header>
          <div></div>
          <div className="text-base">Cabin</div>
          <div className="text-base">Capacity</div>
          <div className="text-base">Price</div>
          <div className="text-base">Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={cabins}
          render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};
