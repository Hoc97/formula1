import { getTeamDriversByIdSeason } from '@/services/api';
import { useQueries } from '@tanstack/react-query';
import { queryName } from '../queryName';



const useTeamDriversByIdSeason = (year: number, teamIdArray: string[], config: { enabled: boolean; } = { enabled: true }) => {
  return useQueries({
    queries: teamIdArray?.map((item) => {
      return {
        queryKey: [queryName.teamDriversById, item],
        queryFn: ({ queryKey }) => getTeamDriversByIdSeason(year.toString(), queryKey[1]),
        keepPreviousData: true,
        staleTime: 5 * (60 * 1000),
        ...config
      };
    })
  });
};

export default useTeamDriversByIdSeason;
