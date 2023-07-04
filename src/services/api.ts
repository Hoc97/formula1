import axios from '@/services/axios';
import endpoints from '@/services/endpoints';
import {
  DriversQueryOptions,
  RacesQueryOptions,
  TeamsQueryOptions,
  RaceResultsQueryOptions,
  RaceResultQueryOptions,
  DriverInfoQueryOptions
} from '@/types/type';

const getListRaces = (season: string): Promise<RacesQueryOptions> => {
  return axios.get(`${season}.json`);
};

const getListRaceResults = (season: string): Promise<RaceResultsQueryOptions> => {
  return axios.get(`${season}/results.json?limit=500`);
};

const getRaceResult = (season: string, round: string): Promise<RaceResultQueryOptions> => {
  return axios.get(`${season}/${round}/results.json`);
};

const getQualifying = (season: string, round: string): Promise<RaceResultQueryOptions> => {
  return axios.get(`${season}/${round}/qualifying.json`);
};

const getSprint = (season: string, round: string): Promise<RaceResultQueryOptions> => {
  return axios.get(`${season}/${round}/sprint.json`);
};

const getListDrivers = (season: string): Promise<DriversQueryOptions> => {
  return axios.get(`${season}/driverStandings.json`);
};

const getDriverStatsById = (driverId: string): Promise<RacesQueryOptions> => {
  return axios.get(`/drivers/${driverId}/results.json?limit=500`);
};

const getDriverInfoById = (driverId: string): Promise<DriverInfoQueryOptions> => {
  return axios.get(`/drivers/${driverId}.json`);
};

const getDriverChampsById = (driverId: string): Promise<DriversQueryOptions> => {
  return axios.get(`/drivers/${driverId}/driverStandings.json?limit=500`);
};

const getListTeams = (season: string): Promise<TeamsQueryOptions> => {
  return axios.get(`${season}/constructorStandings.json`);
};

const getListFastestLapTimes = (season: string): Promise<RacesQueryOptions> => {
  return axios.get(`${season}/fastest/1/results.json`);
};

const getPitStopSummary = (season: string, round: string): Promise<RacesQueryOptions> => {
  return axios.get(`${season}/${round}/pitstops.json?limit=100`);
};

const getRankingRaces = (params?: any): Promise<any[]> => {
  return axios.get(endpoints.rankingRaces, { params });
};

export {
  getListRaces,
  getListDrivers,
  getListTeams,
  getRankingRaces,
  getListRaceResults,
  getRaceResult,
  getListFastestLapTimes,
  getPitStopSummary,
  getQualifying,
  getSprint,
  getDriverStatsById,
  getDriverInfoById,
  getDriverChampsById
};
