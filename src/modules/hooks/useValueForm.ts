import AppContext from '@/context/AppContext';
import { useContext } from 'react';

const useValueForm = (): {
  valueForm: {
    season: number;
    type: string;
    responseKey: string;
  };
  setValueForm: (season: number, type: string, responseKey: string) => void;
} => {
  const { valueForm, setValueForm } = useContext(AppContext);
  return { valueForm, setValueForm };
};

export default useValueForm;
