import Search from '@/components/Search/Search';
import { Outlet, useParams } from 'react-router-dom';

const Teams = () => {
  const params = useParams();

  return (
    <>
      <Search />
      <br />
      <hr />
      <br />
      {params.teamDetail ? <Outlet /> : <div>2023 Constructor Standings</div>}
    </>
  );
};

export default Teams;
