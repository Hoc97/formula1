import { getListRaces } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { queryName } from '../queryName';

const getKey = (name: string, params: string): string[] => [name, params];

const useRaces = (params: number) => {
  const queryKey = getKey(queryName.listRaces, params?.toString());

  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getListRaces(queryKey[1]),
    keepPreviousData: true,
    staleTime: 5 * (60 * 1000)
  });
};

export default useRaces;
