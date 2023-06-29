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
const Sprint = lazy(() => import('@/pages/Sprint/Sprint'));
const Qualifying = lazy(() => import('@/pages/Qualifying/Qualifying'));
const RaceDetail = lazy(() => import('@/pages/RaceDetail/RaceDetail'));
const RaceResult = lazy(() => import('@/pages/RaceResult/RaceResult'));
const SeasonRaceResults = lazy(() => import('@/pages/SeasonRaceResults/SeasonRaceResults'));
const Schedule = lazy(() => import('@/pages/Schedule/Schedule'));
const Result = lazy(() => import('@/pages/Result/Result'));
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
                    path: 'qualifying',
                    element: <Qualifying />
                  },
                  {
                    path: 'sprint-result',
                    element: <Sprint />
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
