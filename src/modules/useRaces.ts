import { queryName } from '@/modules/queryName';
import { getListRaces } from '@/services/api';
import { RacesQueryOptions } from '@/types/type';
import { useQuery } from '@tanstack/react-query';

type RacesKeyType = [string, RacesQueryOptions | undefined];

const getRacesKey = (name: string, params?: RacesQueryOptions): RacesKeyType => [name, params];

const useRaces = (params?: RacesQueryOptions) => {
  const queryKey = getRacesKey(queryName.listRaces, params);

  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getListRaces(queryKey[1]),
    keepPreviousData: true,
    staleTime: 5 * (60 * 1000),
    enabled: false
  });
};

export default useRaces;
