import { getListRaceResults } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { queryName } from '../queryName';

const getKey = (name: string, params: string): string[] => [name, params];

const useRaceResults = (params: number, config: { enabled: boolean } = { enabled: true }) => {
  const queryKey = getKey(queryName.listRaceResults, params?.toString());

  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getListRaceResults(queryKey[1]),
    keepPreviousData: true,
    staleTime: 5 * (60 * 1000),
    ...config
  });
};

export default useRaceResults;
