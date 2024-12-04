import { getDriverStatsByIdSeason } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { queryName } from '../queryName';

const getKey = (name: string, year: string, driverId: string): string[] => [name, year, driverId];

const useDriverStatsByIdSeason = (year: number, driverId: string, config: { enabled: boolean; } = { enabled: true }) => {
  const queryKey = getKey(queryName.driverStatsById, year.toString(), driverId);
  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getDriverStatsByIdSeason(queryKey[1], queryKey[2]),
    keepPreviousData: true,
    staleTime: 5 * (60 * 1000),
    ...config
  });
};

export default useDriverStatsByIdSeason;
