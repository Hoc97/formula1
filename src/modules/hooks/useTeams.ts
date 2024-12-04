import { getListTeams } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { queryName } from '../queryName';

const getKey = (name: string, params: string): string[] => [name, params];

const useTeams = (params: number, config: { enabled: boolean } = { enabled: true }) => {
  const queryKey = getKey(queryName.listTeams, params?.toString());
  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getListTeams(queryKey[1]),
    keepPreviousData: true,
    staleTime: 5 * (60 * 1000),
    ...config
  });
};

export default useTeams;
