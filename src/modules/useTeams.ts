import { queryName } from '@/modules/queryName';
import { getListTeams } from '@/services/api';
import { TeamsQueryOptions } from '@/types/type';
import { useQuery } from '@tanstack/react-query';

type TeamsKeyType = [string, TeamsQueryOptions | undefined];

const getTeamsKey = (name: string, params?: TeamsQueryOptions): TeamsKeyType => [name, params];

const useTeams = (params?: TeamsQueryOptions) => {
  const queryKey = getTeamsKey(queryName.listTeams, params);

  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getListTeams(queryKey[1]),
    keepPreviousData: true,
    staleTime: 5 * (60 * 1000),
    enabled: false
  });
};

export default useTeams;
