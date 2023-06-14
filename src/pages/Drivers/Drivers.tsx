import Search from '@/components/Search/Search';
import { Outlet, useParams } from 'react-router-dom';

const Drivers = () => {
  const params = useParams();

  return (
    <>
      <Search />
      <br />
      <hr />
      <br />
      {params.driverDetail ? <Outlet /> : <div>2023 Driver Standings</div>}
    </>
  );
};

export default Drivers;
