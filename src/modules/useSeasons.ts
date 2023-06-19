import { queryName } from '@/modules/queryName';
import { getListSeasons } from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const getSeasonsKey = (name: string): [string] => [name];

const useSeasons = () => {
  const queryKey = getSeasonsKey(queryName.listSeason);

  return useQuery({
    queryKey,
    queryFn: () => getListSeasons(),
    keepPreviousData: true,
    staleTime: 10 * (60 * 1000)
  });
};

export default useSeasons;
