import { useQueryGlobalState } from '..';

const useYear = () => {
  const thisYear = new Date().getFullYear();
  const [year, setYear] = useQueryGlobalState('year', thisYear);
  return [year, setYear];
};

export default useYear;
