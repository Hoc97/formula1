import { getDriverStatsById } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { queryName } from '../queryName';

const getKey = (name: string, params: string): string[] => [name, params];

const useDriverStatsById = (params: string, config: { enabled: boolean } = { enabled: true }) => {
  const queryKey = getKey(queryName.driverStatsById, params);
  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getDriverStatsById(queryKey[1]),
    keepPreviousData: true,
    staleTime: 5 * (60 * 1000),
    ...config
  });
};

export default useDriverStatsById;
