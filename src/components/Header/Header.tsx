import logo from '@/assets/f1_logo.svg';
import '@/components/Header/Header.scss';
import { useTabMenu, useValueForm, useYear } from '@/modules';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

const { Header } = Layout;

const HeaderPage = () => {
  const { pathname } = useLocation();
  const { season, raceDetail } = useParams();
  const { valueForm, setValueForm } = useValueForm();
  const { setCurrentTabMenu } = useTabMenu();
  const [current, setCurrent] = useState('');
  const [year] = useYear();

  useEffect(() => {
    if (pathname === '/racing') {
      document.title = `F1 Schedule ${year}`;
      setCurrent('racing');
      return;
    }
    if (pathname.includes('/results/') && season) {
      document.title = `F1 Results ${season}`;
      setCurrent('results');
      if (raceDetail && valueForm.responseKey !== raceDetail.toUpperCase()) {
        setValueForm(+season, 'races', raceDetail.toUpperCase());
        return;
      }
      if (!current || year !== +season) {
        if (pathname.includes('races')) setValueForm(+season, 'races', 'ALL');
        if (pathname.includes('drivers')) setValueForm(+season, 'drivers', 'ALL');
        if (pathname.includes('teams')) setValueForm(+season, 'teams', 'ALL');
        if (pathname.includes('fastest-laps-award')) setValueForm(+season, 'fastest-laps-award', 'ALL');
        return;
      }
      if (pathname === `/results/${season}/races`) {
        setValueForm(+season, 'races', 'ALL');
        return;
      }
      return;
    }
    if (pathname === '/drivers') {
      document.title = `F1 Drivers ${year}`;
      setCurrent('drivers');
      return;
    }
    if (pathname === '/teams') {
      document.title = `F1 Teams ${year}`;
      setCurrent('teams');
      return;
    }
    setCurrent('');
    document.title = 'F1 - Home';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, season]);

  const items: MenuProps['items'] = [
    {
      label: <Link to='/racing'>Schedule</Link>,
      key: 'racing'
    },
    {
      label: <Link to={`/results/${year}/races`}>Results</Link>,
      key: 'results'
    },
    {
      label: <Link to='/drivers'>Drivers</Link>,
      key: 'drivers'
    },
    {
      label: <Link to='/teams'>Teams</Link>,
      key: 'teams'
    }
  ];

  const handleChange: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    if (e.key === 'results') {
      setValueForm(year, 'races', 'ALL');
      setTimeout(() => {
        setCurrentTabMenu('race-result');
      }, 300);
    }
  };
  return (
    <Header className='layout-header-page'>
      <div className='logo'>
        <Link to='/'>
          <img src={logo} alt='test' />
        </Link>
      </div>
      <Menu theme='dark' onClick={handleChange} mode='horizontal' selectedKeys={[current]} items={items} />
    </Header>
  );
};

export default HeaderPage;
