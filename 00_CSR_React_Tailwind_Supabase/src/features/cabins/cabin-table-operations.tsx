// Components
import { Filter } from '@/components/ui/filter';
import { SortBy } from '@/components/ui/sort-by';

const CabinTableOperations: React.FC = () => {
  return (
    <div className="flex items-center gap-7">
      <Filter
        filterField="discount"
        options={[
          { value: 'all', label: 'All' },
          { value: 'no-discount', label: 'No discount' },
          { value: 'with-discount', label: 'With discount' },
        ]}
      />

      <SortBy
        options={[
          { value: 'name-asc', label: 'Sort by name (A-Z)' },
          { value: 'name-desc', label: 'Sort by name (Z-A)' },
          { value: 'regular_price-asc', label: 'Sort by price (low first)' },
          {
            value: 'regular_price-desc',
            label: 'Sort by price (high first)',
          },
          { value: 'max_capacity-asc', label: 'Sort by capacity (low first)' },
          {
            value: 'max_capacity-desc',
            label: 'Sort by capacity (high first)',
          },
        ]}
      />
    </div>
  );
};

export default CabinTableOperations;
