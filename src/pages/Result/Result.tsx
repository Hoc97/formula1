import useRaces from '@/modules/useRaces';
import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';

const Result = () => {
  const { data, isLoading } = useRaces({ season: '2023', type: 'race' });

  const raceCompleted = useMemo(() => {
    return data?.data?.response?.filter((item) => {
      return item.status === 'Completed';
    });
  }, [data]);
  return (
    <>
      {/* {isLoading && <>Loading</>}
      {!isLoading && <>{JSON.stringify(raceCompleted)}</>} */}
      <Outlet />
    </>
  );
};

export default Result;
