import { getQualifying } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { queryName } from '../queryName';

const getKey = (name: string, year: string, round: string): string[] => [name, year, round];

const useQualifying = (year: number, round: string, config: { enabled: boolean } = { enabled: true }) => {
  const queryKey = getKey(queryName.listQualifying, year?.toString(), round);

  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getQualifying(queryKey[1], queryKey[2]),
    keepPreviousData: true,
    staleTime: 5 * (60 * 1000),
    ...config
  });
};

export default useQualifying;
