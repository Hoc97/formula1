import { getListFastestLapTimes } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { queryName } from '../queryName';

const getKey = (name: string, params: string): string[] => [name, params];

const useFastestLapAward = (params: number) => {
  const queryKey = getKey(queryName.listFastestLapAward, params?.toString());

  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getListFastestLapTimes(queryKey[1]),
    keepPreviousData: true,
    staleTime: 5 * (60 * 1000)
  });
};

export default useFastestLapAward;
