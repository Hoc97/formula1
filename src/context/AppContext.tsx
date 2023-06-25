import { createContext, useState } from 'react';

type UserContextType = {
  valueForm: {
    season: number;
    type: string;
    responseKey: string;
  };
  setYear: (year: number) => void;
  setValueForm: (season: number, type: string, responseKey: string) => void;
};

const iUserContextState: UserContextType = {
  valueForm: {
    season: new Date().getFullYear(),
    type: 'races',
    responseKey: 'all'
  },
  setYear: () => undefined,
  setValueForm: () => undefined
};

const AppContext = createContext<UserContextType>(iUserContextState);

export const AppProvider = ({ children }) => {
  const initState = {
    valueForm: {
      season: new Date().getFullYear(),
      type: 'races',
      responseKey: 'all'
    }
  };
  const [state, setStateContext] = useState(initState);

  const setYear = (year: number) => {
    setStateContext({
      ...state,
      valueForm: {
        ...state.valueForm,
        season: year
      }
    });
  };

  const setValueForm = (season: number, type: string, responseKey: string) => {
    setStateContext({
      ...state,
      valueForm: { season, type, responseKey }
    });
  };

  return <AppContext.Provider value={{ ...state, setYear, setValueForm }}>{children}</AppContext.Provider>;
};

export default AppContext;
