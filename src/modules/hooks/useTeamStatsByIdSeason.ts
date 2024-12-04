import { getTeamStatsByIdSeason } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { queryName } from '../queryName';

const getKey = (name: string, year: string, teamId: string): string[] => [name, year, teamId];

const useTeamStatsByIdSeason = (year: number, teamId: string, config: { enabled: boolean; } = { enabled: true }) => {
  const queryKey = getKey(queryName.teamStatsById, year.toString(), teamId);
  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getTeamStatsByIdSeason(queryKey[1], queryKey[2]),
    keepPreviousData: true,
    staleTime: 5 * (60 * 1000),
    ...config
  });
};

export default useTeamStatsByIdSeason;
