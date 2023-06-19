import { queryName } from '@/modules/queryName';
import { getListDrivers } from '@/services/api';
import { DriversQueryOptions } from '@/types/type';
import { useQuery } from '@tanstack/react-query';

type DriversKeyType = [string, DriversQueryOptions | undefined];

const getDriversKey = (name: string, params?: DriversQueryOptions): DriversKeyType => [name, params];

const useDrivers = (params?: DriversQueryOptions) => {
  const queryKey = getDriversKey(queryName.listDrivers, params);

  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getListDrivers(queryKey[1]),
    keepPreviousData: true,
    staleTime: 5 * (60 * 1000),
    enabled: false
  });
};

export default useDrivers;
