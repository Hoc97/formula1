import { useQuery } from '@tanstack/react-query';

const getKey = (name: string, params: string): string[] => [name, params];

const getPhoto = (season: string) => {
  // return axios.get(`${season}.json`);
};

const usePhoto = (name: string, params: string) => {
  const queryKey = getKey(name, params);
  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getPhoto(queryKey[1]),
    keepPreviousData: true,
    staleTime: 5 * (60 * 1000)
  });
};

export default usePhoto;
