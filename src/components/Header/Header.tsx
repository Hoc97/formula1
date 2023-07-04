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
  const { season, raceDetail, driverStandingDetail, teamStandingDetail } = useParams();
  const { valueForm, setValueForm } = useValueForm();
  const { currentTabMenu, setCurrentTabMenu } = useTabMenu();
  const [current, setCurrent] = useState('');
  const [year] = useYear();

  useEffect(() => {
    const lastParam = pathname.match(/[^/]+$/g)?.[0];
    const typeResultParams = ['races', 'drivers', 'teams', 'fastest-laps-award'];
    const title = {
      home: 'F1 - Home',
      racing: 'F1 Schedule',
      results: 'F1 Results',
      drivers: 'F1 Drivers',
      teams: 'F1 Teams'
    };

    if (lastParam && pathname === `/${lastParam}`) {
      setCurrent(lastParam);
      document.title = `${title[lastParam]} ${year}`;
      return;
    }
    if (lastParam && pathname === `/drivers/${lastParam}`) {
      setCurrent('drivers');
      document.title = `${title.drivers} ${year}`;
      return;
    }
    if (lastParam && pathname === `/teams/${lastParam}`) {
      setCurrent('teams');
      document.title = `${title.teams} ${year}`;
      return;
    }
    if (season && pathname.includes(`/results/${season}`)) {
      document.title = `${title.results} ${season}`;
      setCurrent('results');
      if (raceDetail && valueForm.responseKey !== raceDetail.toUpperCase()) {
        setValueForm(+season, 'races', raceDetail.toUpperCase());
        return;
      }
      if (driverStandingDetail && valueForm.responseKey !== driverStandingDetail.toUpperCase()) {
        const nameDetailArray = `${driverStandingDetail},`.split('-');
        const nameDetail = [...nameDetailArray.slice(1), ...nameDetailArray.slice(0, 1)].join(' ').toUpperCase();
        setValueForm(+season, 'drivers', nameDetail);
        return;
      }
      if (teamStandingDetail && valueForm.responseKey !== teamStandingDetail.toUpperCase()) {
        setValueForm(+season, 'teams', teamStandingDetail.toUpperCase());
        return;
      }
      if (lastParam && typeResultParams.includes(lastParam)) {
        if (!current) {
          setValueForm(+season, lastParam, 'ALL');
        } else {
          setValueForm(year, lastParam, 'ALL');
        }
        return;
      }
      return;
    }
    setCurrent('');
    document.title = title.home;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, season, year]);

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
      if (currentTabMenu !== 'race-result') {
        setTimeout(() => {
          setCurrentTabMenu('race-result');
        }, 300);
      }
    }
  };

  return (
    <Header className='layout-header-page'>
      <div className='logo'>
        <Link to='/'>
          <img src={logo} alt='logo' />
        </Link>
      </div>
      <Menu theme='dark' onClick={handleChange} mode='horizontal' selectedKeys={[current]} items={items} />
    </Header>
  );
};

export default HeaderPage;
