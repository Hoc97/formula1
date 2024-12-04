import { getListDrivers } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { queryName } from '../queryName';

const getKey = (name: string, params: string): string[] => [name, params];

const useDriverStandings = (params: number, config: { enabled: boolean; } = { enabled: true }) => {
  const queryKey = getKey(queryName.listDrivers, params?.toString());
  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getListDrivers(queryKey[1]),
    keepPreviousData: true,
    staleTime: 5 * (60 * 1000),
    ...config
  });
};

export default useDriverStandings;
