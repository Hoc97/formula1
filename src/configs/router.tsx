/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const LayoutPage = lazy(() => import('@/layouts/LayoutPage/LayoutPage'));
import Drivers from '@/pages/Drivers/Drivers'; //use Lazy will show down when switch tabs
const DriverInfo = lazy(() => import('@/pages/DriverInfo/DriverInfo'));
const DriverStandingDetail = lazy(() => import('@/pages/DriverStandingDetail/DriverStandingDetail'));
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
const TeamStandingDetail = lazy(() => import('@/pages/TeamStandingDetail/TeamStandingDetail'));
const TeamStandings = lazy(() => import('@/pages/TeamStandings/TeamStandings'));
const Teams = lazy(() => import('@/pages/Teams/Teams'));
const TeamInfo = lazy(() => import('@/pages/TeamInfo/TeamInfo'));
const Home = lazy(() => import('@/pages/Home/Home'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'racing', element: <Schedule /> },
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
                  { path: 'race-result', element: <RaceResult /> },
                  { path: 'fastest-laps', element: <FastestLaps /> },
                  { path: 'pit-stop-summary', element: <PitStopSummary /> },
                  { path: 'qualifying', element: <Qualifying /> },
                  { path: 'sprint-result', element: <Sprint /> }
                ]
              }
            ]
          },
          {
            path: 'drivers',
            element: <DriverStandings />,
            children: [{ path: ':driverStandingDetail', element: <DriverStandingDetail /> }]
          },
          {
            path: 'teams',
            element: <TeamStandings />,
            children: [{ path: ':teamStandingDetail', element: <TeamStandingDetail /> }]
          },
          { path: 'fastest-laps-award', element: <FastestLapsAward /> }
        ]
      },
      {
        path: 'drivers',
        element: <Drivers />,
        children: [{ path: ':driverinfo', element: <DriverInfo /> }]
      },
      {
        path: 'teams',
        element: <Teams />,
        children: [{ path: ':teaminfo', element: <TeamInfo /> }]
      },
      { path: '*', element: <NotFound /> }
    ]
  }
]);
