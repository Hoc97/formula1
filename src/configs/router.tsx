import Dashboard from '@/pages/Dashboard/Dashboard';
import FastestLaps from '@/pages/FastestLaps/FastestLaps';
import LayoutPage from '@/layouts/LayoutPage/LayoutPage';
import NotFound from '@/pages/NotFound/NotFound';
import RaceResult from '@/pages/RaceResult/RaceResult';
import Result from '@/pages/Result/Result';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import PitStopSummary from '@/pages/PitStopSummary/PitStopSummary';
import StartingGrid from '@/pages/StartingGrid/StartingGrid';
import Qualifying from '@/pages/Qualifying/Qualifying';
import Practice_3 from '@/pages/Practice_3/Practice_3';
import Practice_2 from '@/pages/Practice_2/Practice_2';
import Practice_1 from '@/pages/Practice_1/Practice_1';
import Races from '@/pages/Races/Races';
import RaceDetail from '@/pages/RaceDetail/RaceDetail';
import Drivers from '@/pages/Drivers/Drivers';
import DriverDetail from '@/pages/DriverDetail/DriverDetail';
import TeamDetail from '@/pages/TeamDetail/TeamDetail';
import Teams from '@/pages/Teams/Teams';
import FastestLapsAward from '@/pages/FastestLapsAward/FastestLapsAward';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        path: 'results/:season',
        element: <Result />,
        children: [
          {
            index: true,
            element: <Navigate replace to="races" />
          },
          {
            path: 'races',
            element: <Races />,
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
            element: <Drivers />,
            children: [
              {
                path: ':driverDetail',
                element: <DriverDetail />
              }
            ]
          },
          {
            path: 'teams',
            element: <Teams />,
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
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);
