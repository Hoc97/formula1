/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const LayoutPage = lazy(() => import('../layouts/LayoutPage/LayoutPage'));
const Drivers = lazy(() => import('@/pages/Drivers/Drivers'));
const DriverDetail = lazy(() => import('@/pages/DriverDetail/DriverDetail'));
const DriverStandings = lazy(() => import('@/pages/DriverStandings/DriverStandings'));
const FastestLaps = lazy(() => import('@/pages/FastestLaps/FastestLaps'));
const FastestLapsAward = lazy(() => import('@/pages/FastestLapsAward/FastestLapsAward'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));
const PitStopSummary = lazy(() => import('@/pages/PitStopSummary/PitStopSummary'));
const Practice_1 = lazy(() => import('@/pages/Practice_1/Practice_1'));
const Practice_2 = lazy(() => import('@/pages/Practice_2/Practice_2'));
const Practice_3 = lazy(() => import('@/pages/Practice_3/Practice_3'));
const Qualifying = lazy(() => import('@/pages/Qualifying/Qualifying'));
const RaceDetail = lazy(() => import('@/pages/RaceDetail/RaceDetail'));
const RaceResult = lazy(() => import('@/pages/RaceResult/RaceResult'));
const SeasonRaceResults = lazy(() => import('@/pages/SeasonRaceResults/SeasonRaceResults'));
const Schedule = lazy(() => import('@/pages/Schedule/Schedule'));
const Result = lazy(() => import('@/pages/Result/Result'));
const StartingGrid = lazy(() => import('@/pages/StartingGrid/StartingGrid'));
const TeamDetail = lazy(() => import('@/pages/TeamDetail/TeamDetail'));
const TeamStandings = lazy(() => import('@/pages/TeamStandings/TeamStandings'));
const Teams = lazy(() => import('@/pages/Teams/Teams'));
const Home = lazy(() => import('@/pages/Home/Home'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'racing',
        element: <Schedule />
      },
      {
        path: 'results/:season',
        element: <Result />,
        children: [
          {
            path: 'races',
            element: <SeasonRaceResults />,
            children: [
              {
                path: ':raceDetail',
                element: <RaceDetail />,
                children: [
                  {
                    path: 'race-result',
                    element: <RaceResult />
                  },
                  {
                    path: 'fastest-laps',
                    element: <FastestLaps />
                  },
                  {
                    path: 'pit-stop-summary',
                    element: <PitStopSummary />
                  },
                  {
                    path: 'starting-grid',
                    element: <StartingGrid />
                  },
                  {
                    path: 'qualifying',
                    element: <Qualifying />
                  },
                  {
                    path: 'practice-3',
                    element: <Practice_3 />
                  },
                  {
                    path: 'practice-2',
                    element: <Practice_2 />
                  },
                  {
                    path: 'practice-1',
                    element: <Practice_1 />
                  }
                ]
              }
            ]
          },
          {
            path: 'drivers',
            element: <DriverStandings />,
            children: [
              {
                path: ':driverDetail',
                element: <DriverDetail />
              }
            ]
          },
          {
            path: 'teams',
            element: <TeamStandings />,
            children: [
              {
                path: ':teamDetail',
                element: <TeamDetail />
              }
            ]
          },
          {
            path: 'fastest-laps-award',
            element: <FastestLapsAward />
          }
        ]
      },
      {
        path: 'drivers',
        element: <Drivers />
      },
      {
        path: 'teams',
        element: <Teams />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);
