import AppContext from '@/context/AppContext';
import { useContext } from 'react';

const useTabMenu = (): { currentTabMenu: string; setCurrentTabMenu: (currentTabMenu: string) => void } => {
  const { currentTabMenu, setCurrentTabMenu } = useContext(AppContext);
  return { currentTabMenu, setCurrentTabMenu };
};

export default useTabMenu;
