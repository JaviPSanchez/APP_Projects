// Libraries
import { useQuery } from '@tanstack/react-query';

// API
import { getSettings } from '@/services/api-settings';

export function useSettings() {
  const {
    isPending,
    error,
    data: settings,
  } = useQuery({
    queryKey: ['settings'],
    queryFn: getSettings,
  });

  return { isPending, error, settings };
}
