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

type RacesKeyType = [string, RacesQueryOptions | undefined];

type RankingRacesQueryOptions = number[];

type DriversQueryOptions = {
  team?: number;
  driver?: number;
  season: number;
};

type TeamsQueryOptions = {
  team?: number;
  season: number;
};

export type {
  RacesQueryOptions,
  RacesKeyType,
  RankingRacesQueryOptions,
  DriversQueryOptions,
  TeamsQueryOptions,
  RaceResultsQueryOptions
};

// export type RaceQueryData = {
//   id: object;
//   competition: object;
//   circuit: object;
//   season: number;
//   type: string;
//   laps: object;
//   fastest_lap: object;
//   distance: string;
//   timezone: string;
//   date: string;
//   weather: null;
//   status: string;
// };
