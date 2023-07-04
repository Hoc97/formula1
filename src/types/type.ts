type RacesQueryOptions = {
  RaceTable: {
    season: string;
    Races: any[];
  };
  limit: string;
  offet: string;
  series: string;
  total: string;
  url: string;
  xmlns: string;
};

type RaceResultsQueryOptions = RacesQueryOptions;
type RaceResultQueryOptions = RacesQueryOptions;

type RacesKeyType = [string, RacesQueryOptions | undefined];

type RankingRacesQueryOptions = number[];

type DriversQueryOptions = {
  StandingsTable: {
    season: string;
    StandingsLists: any[];
  };
  limit: string;
  offet: string;
  series: string;
  total: string;
  url: string;
  xmlns: string;
};

type DriverInfoQueryOptions = {
  DriverTable: {
    driverId: string;
    Drivers: any[];
  };
  limit: string;
  offet: string;
  series: string;
  total: string;
  url: string;
  xmlns: string;
};

type TeamsQueryOptions = {
  StandingsTable: {
    season: string;
    StandingsLists: any[];
  };
  limit: string;
  offet: string;
  series: string;
  total: string;
  url: string;
  xmlns: string;
};

export type {
  RacesQueryOptions,
  RacesKeyType,
  RankingRacesQueryOptions,
  DriversQueryOptions,
  TeamsQueryOptions,
  RaceResultsQueryOptions,
  RaceResultQueryOptions,
  DriverInfoQueryOptions
};
