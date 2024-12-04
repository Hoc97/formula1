import { getDriverChampsById } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { queryName } from '../queryName';

const getKey = (name: string, params: string): string[] => [name, params];

const useDriverChampsById = (params: string, config: { enabled: boolean; } = { enabled: true }) => {
  const queryKey = getKey(queryName.driverChampsByIdId, params);
  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getDriverChampsById(queryKey[1]),
    keepPreviousData: true,
    staleTime: 5 * (60 * 1000),
    ...config
  });
};

export default useDriverChampsById;
