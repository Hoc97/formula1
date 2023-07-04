import { getDriverInfoById } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { queryName } from '../queryName';

const getKey = (name: string, params: string): string[] => [name, params];

const useDriverInfoById = (params: string, config: { enabled: boolean; } = { enabled: true }) => {
  const queryKey = getKey(queryName.driverInfoById, params);
  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getDriverInfoById(queryKey[1]),
    keepPreviousData: true,
    staleTime: 5 * (60 * 1000),
    ...config
  });
};

export default useDriverInfoById;
