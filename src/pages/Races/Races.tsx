import Search from '@/components/Search/Search';
import { Outlet, useParams } from 'react-router-dom';

const Races = () => {
  const params = useParams();

  return (
    <>
      <Search />
      <br />
      <hr />
      <br />
      {params.raceDetail ? <Outlet /> : <div>2023 RACE RESULTS</div>}
    </>
  );
};

export default Races;
