import { createBrowserRouter } from 'react-router-dom';
import Result from '@/pages/Result/index';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Result />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      }
    ]
  }
]);
