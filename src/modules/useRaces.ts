import { useQuery } from 'react-query';
import { queryName } from './types';
import axios from '@/services/axios';
import endpoints from '@/services/endpoints';

type RacesQueryOptions = {
  competition?: string;
  type?: string;
  season?: string;
};

type RacesKeyType = [string, RacesQueryOptions | undefined];

const getRacesKey = (name: string, options?: RacesQueryOptions): RacesKeyType => [name, options];

const getListRaces = (params?: RacesQueryOptions) => {
  return axios.get(endpoints.races, { params });
};

const useRaces = (params?: RacesQueryOptions) => {
  const queryKey = getRacesKey(queryName.listRace, params);

  return useQuery({
    queryKey,
    queryFn: ({ queryKey }) => getListRaces(queryKey[1])
  });
};

export default useRaces;
