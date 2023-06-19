import { queryName } from '@/modules/queryName';
import { getRankingRaces } from '@/services/api';
import { RankingRacesQueryOptions } from '@/types/type';
import { useQueries } from '@tanstack/react-query';

const useRankingRaces = (params: RankingRacesQueryOptions) => {
  return useQueries({
    queries: params?.map((item) => {
      return {
        queryKey: [queryName.rankingsRace, item],
        queryFn: ({ queryKey }) => {
          return getRankingRaces({ race: queryKey[1] });
        },
        keepPreviousData: true,
        staleTime: 15 * (60 * 1000),
        cacheTime: 20 * (60 * 1000),
        enabled: !!params
      };
    })
  });
};

export default useRankingRaces;
