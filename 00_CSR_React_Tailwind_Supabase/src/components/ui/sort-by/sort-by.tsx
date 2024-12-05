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
    />
  );
};
