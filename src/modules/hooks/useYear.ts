import AppContext from '@/context/AppContext';
import { useContext } from 'react';

const useYear = (): [number, (year: number) => void] => {
  const {
    valueForm: { season },
    setYear
  } = useContext(AppContext);
  const year = season;
  return [year, setYear];
};

export default useYear;
