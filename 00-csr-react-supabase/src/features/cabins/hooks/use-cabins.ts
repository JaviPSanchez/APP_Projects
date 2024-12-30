import { useQuery } from '@tanstack/react-query';

import { getCabins } from '@/services/api-cabins';

export function useCabins() {
  const queryResult = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  const { isPending, error, data: cabins } = queryResult;

  return { isPending, error, cabins };
}
