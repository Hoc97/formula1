export type RacesQueryOptions = {
  competition?: number;
  type?: string;
  season: number;
};

export type RankingRacesQueryOptions = number[];

export type DriversQueryOptions = {
  team?: number;
  driver?: number;
  season: number;
};

export type TeamsQueryOptions = {
  team?: number;
  season: number;
};

export interface ssdas {
  season: number;
}

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
