import axios from '@/services/axios';
import endpoints from '@/services/endpoints';
import { RacesQueryOptions } from '@/types/type';

const getListRaces = (params?: RacesQueryOptions) => {
  return axios.get(endpoints.races, { params });
};

export { getListRaces };
