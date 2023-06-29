import { createContext, useState } from 'react';

type UserContextType = {
  valueForm: {
    season: number;
    type: string;
    responseKey: string;
  };
  setYear: (year: number) => void;
  setValueForm: (season: number, type: string, responseKey: string) => void;
  currentTabMenu: string;
  setCurrentTabMenu: (ResultMenu: string) => void;
};

const iUserContextState: UserContextType = {
  valueForm: {
    season: new Date().getFullYear(),
    type: 'races',
    responseKey: 'ALL'
  },
  setYear: () => undefined,
  setValueForm: () => undefined,
  currentTabMenu: 'race-result',
  setCurrentTabMenu: () => undefined
};

const AppContext = createContext<UserContextType>(iUserContextState);

export const AppProvider = ({ children }) => {
  const initState = {
    valueForm: {
      season: new Date().getFullYear(),
      type: 'races',
      responseKey: 'ALL'
    }
  };
  const [state, setStateContext] = useState(initState);
  const [currentTabMenu, setCurrentTabMenu] = useState('race-result');

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

  return (
    <AppContext.Provider value={{ ...state, setYear, setValueForm, currentTabMenu, setCurrentTabMenu }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
