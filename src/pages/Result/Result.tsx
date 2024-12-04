import Search from '@/components/Search/Search';
import { Outlet } from 'react-router-dom';

const Result = () => {
  return (
    <>
      <Search />
      <hr />
      <Outlet />
    </>
  );
};

export default Result;
