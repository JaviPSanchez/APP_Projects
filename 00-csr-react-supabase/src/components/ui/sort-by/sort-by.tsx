// React
import { useSearchParams } from 'react-router-dom';

//Components
import { Select } from '@/components/ui/select';

interface Option {
  label: string;
  value: string;
}

interface SortByProps {
  options: Option[];
}

export const SortBy: React.FC<SortByProps> = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
      className="rounded-lg border border-color-grey-100 bg-color-grey-0 p-3.5 text-lg font-medium text-black shadow-sm transition-colors duration-300 hover:bg-color-grey-50 disabled:cursor-not-allowed"
    />
  );
};
