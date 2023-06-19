import axios from '@/services/axios';
import endpoints from '@/services/endpoints';
import { DriversQueryOptions, RacesQueryOptions, TeamsQueryOptions, RankingRacesQueryOptions } from '@/types/type';

const getListSeasons = (): Promise<number[]> => {
  return axios.get(endpoints.seasons);
};

const getListRaces = (params?: RacesQueryOptions): Promise<any[]> => {
  return axios.get(endpoints.races, { params });
};

const getRankingRaces = (params?: any): Promise<any[]> => {
  return axios.get(endpoints.rankingRaces, { params });
};

const getListDrivers = (params?: DriversQueryOptions): Promise<any[]> => {
  return axios.get(endpoints.drivers, { params });
};

const getListTeams = (params?: TeamsQueryOptions): Promise<any[]> => {
  return axios.get(endpoints.teams, { params });
};

export { getListRaces, getListSeasons, getListDrivers, getListTeams, getRankingRaces };
