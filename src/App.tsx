import queryClient from '@/services/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/configs/router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import '@/App.scss';
import LoadingPage from '@/pages/LoadingPage/LoadingPage';

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
