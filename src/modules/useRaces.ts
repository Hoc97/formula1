import { getListRaces } from '@/services/api';
import { RacesQueryOptions } from '@/types/type';
import { useQuery } from '@tanstack/react-query';
import { queryName } from '@/modules/queryName';

type RacesKeyType = [string, RacesQueryOptions | undefined];

const getRacesKey = (name: string, params?: RacesQueryOptions): RacesKeyType => [name, params];

const useRaces = (params?: RacesQueryOptions) => {
  const queryKey = getRacesKey(queryName.listRace, params);

  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getListRaces(queryKey[1]),
    keepPreviousData: true
  });
};

export default useRaces;
