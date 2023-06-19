import queryClient from '@/services/queryClient';
import { useQuery } from '@tanstack/react-query';

const useRQGlobalState = (key: string, initialData?: any) => [
  useQuery({
    queryKey: [key],
    queryFn: () => initialData
  }).data,
  (value) => queryClient.setQueryData([key], value)
];

export default useRQGlobalState;
