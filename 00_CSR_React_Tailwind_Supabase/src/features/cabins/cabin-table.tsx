// Components
import { useSearchParams } from 'react-router-dom';

// Components
import { Empty } from '@/components/ui/empty';
import { Menus } from '@/components/ui/menus';
import { Spinner } from '@/components/ui/spinner';
import { Table } from '@/components/ui/table';
import { CabinRow } from '@/features/cabins/cabin-row';
// Hooks
import { useCabins } from '@/features/cabins/hooks/use-cabins';

export const CabinTable = () => {
  const { cabins, isPending } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;

  if (!cabins.length) return <Empty resourceName="cabins" />;

  // 1) FILTER
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins: Array<YourCabinType> = [];
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter(cabin => cabin.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filteredCabins?.sort((a, b) => {
    if (typeof a[field] === 'string') {
      return a[field].localeCompare(b[field]) * modifier;
    } else {
      return (a[field] - b[field]) * modifier;
    }
  });

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
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}
          render={cabin => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};
