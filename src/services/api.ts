import axios from '@/services/axios';
import endpoints from '@/services/endpoints';
import {
  DriversQueryOptions,
  RacesQueryOptions,
  TeamsQueryOptions,
  RaceResultsQueryOptions,
  RaceResultQueryOptions,
  DriverInfoQueryOptions,
  TeamDriversQueryOptions
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

const getDriverStatsByIdSeason = (season: string, driverId: string): Promise<RacesQueryOptions> => {
  return axios.get(`${season}/drivers/${driverId}/results.json?limit=100`);
};

const getTeamDriversByIdSeason = (season: string, teamId: string): Promise<TeamDriversQueryOptions> => {
  return axios.get(`${season}/constructors/${teamId}/drivers.json`);
};

const getDriverStatsById = (driverId: string): Promise<RacesQueryOptions> => {
  return axios.get(`drivers/${driverId}/results.json?limit=500`);
};

const getDriverInfoById = (driverId: string): Promise<DriverInfoQueryOptions> => {
  return axios.get(`drivers/${driverId}.json`);
};

const getDriverChampsById = (driverId: string): Promise<DriversQueryOptions> => {
  return axios.get(`drivers/${driverId}/driverStandings.json?limit=500`);
};

const getListTeams = (season: string): Promise<TeamsQueryOptions> => {
  return axios.get(`${season}/constructorStandings.json`);
};

const getTeamStatsByIdSeason = (season: string, teamId: string): Promise<RacesQueryOptions> => {
  return axios.get(`${season}/constructors/${teamId}/results.json?limit=100`);
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
  getDriverStatsByIdSeason,
  getDriverInfoById,
  getDriverChampsById,
  getTeamStatsByIdSeason,
  getDriverStatsById,
  getTeamDriversByIdSeason
};
