import { useSearchParams } from 'react-router-dom';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterProps {
  filterField: string;
  options: FilterOption[];
}

export const Filter: React.FC<FilterProps> = ({ filterField, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  const handleClick = (value: string) => {
    searchParams.set(filterField, value);
    if (searchParams.get('page')) searchParams.set('page', '1');

    setSearchParams(searchParams);
  };

  return (
    <div className="flex gap-1 rounded-sm border border-color-grey-100 bg-color-grey-0 p-1 shadow-sm">
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => handleClick(option.value)}
          className={`rounded-sm px-2 py-2.5 text-sm font-medium transition-colors duration-300 ${
            option.value === currentFilter
              ? 'bg-color-brand-600 text-color-brand-50'
              : 'bg-color-grey-0 text-black'
          } hover:bg-color-brand-600 hover:text-color-brand-50 disabled:cursor-not-allowed`}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
