import axios from '@/services/axios';
import endpoints from '@/services/endpoints';
import { DriversQueryOptions, RacesQueryOptions, TeamsQueryOptions, RaceResultsQueryOptions } from '@/types/type';

// const getListSeasons = (season: string): Promise<string[]> => {
//   return axios.get(`${season}.json`);
// };

const getListRaces = (season: string): Promise<RacesQueryOptions> => {
  return axios.get(`${season}.json`);
};

const getListRaceResults = (season: string): Promise<RaceResultsQueryOptions> => {
  return axios.get(`${season}/results.json?limit=500`);
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

export { getListRaces, getListDrivers, getListTeams, getRankingRaces, getListRaceResults };
