import { QueryClientProvider } from 'react-query';
import queryClient from '@/services/queryClient';
import Result from '@/pages/Result';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Result />
    </QueryClientProvider>
  );
}

export default App;
