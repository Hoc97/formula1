import useRaces from '@/modules/useRaces';

const Result = () => {
  const { data, isLoading } = useRaces({ season: '2022', competition: '23', type: 'race' });

  return (
    <>
      {isLoading && <>Loading</>}
      {!isLoading && <>{JSON.stringify(data)}</>}
    </>
  );
};

export default Result;
