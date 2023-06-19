import '@/pages/RaceDetail/RaceDetail.scss';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    type
  } as MenuItem;
}

const RaceDetail = () => {
  const param = useParams();
  const data = [
    {
      label: 'RACE RESULT',
      key: 'race-result'
    },
    {
      label: 'FASTEST LAPS',
      key: 'fastest-laps'
    },
    {
      label: 'PIT STOP SUMMARY',
      key: 'pit-stop-summary'
    },
    {
      label: 'STARTING GRID',
      key: 'starting-grid'
    },
    {
      label: 'QUALIFYING',
      key: 'qualifying'
    },
    {
      label: 'PRACTICE 3',
      key: 'practice-3'
    },
    {
      label: 'PRACTICE 2',
      key: 'practice-2'
    },
    {
      label: 'PRACTICE 1',
      key: 'practice-1'
    }
  ];

  const dataMenu = data.map((item) => {
    return getItem(item.label, item.key);
  });

  const items: MenuProps['items'] = [
    getItem(<b style={{ color: 'black' }}>RACE</b>, 'race', null, dataMenu, 'group')
  ];

  const nav = useNavigate();
  const { pathname } = useLocation();
  const { season, raceDetail } = useParams();
  const [goBack, setGoBack] = useState(false);
  const [current, setCurrent] = useState('race-result');

  useEffect(() => {
    if (pathname.includes(`/${raceDetail}/`)) {
      setCurrent(pathname?.split('/')[5]);
    }
    if (!goBack && pathname === `/results/${season}/races/${raceDetail}`) {
      nav(`race-result`);
      return;
    }
    if (goBack && pathname === `/results/${season}/races/${raceDetail}`) {
      nav(`/results/${season}/races`);
      return;
    }
    if (pathname === `/results/${season}/races/${raceDetail}/race-result`) {
      setGoBack(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  const handleActiveRace: MenuProps['onClick'] = (e) => {
    // console.log('click ', e);
    nav(`${e.key}`);
  };

  return (
    <div className='races-detail-container'>
      <div className='header'>
        <h1>
          FORMULA 1 {param.raceDetail?.toUpperCase()} GRAND PRIX {param.season}{' '}
        </h1>
        <h1>- {data[data.findIndex((item) => item.key === current)].label}</h1>
        <p className='date'>
          <span>05 Mar 2023</span>
          <span>Bahrain International Circuit</span>
        </p>
      </div>
      <div style={{ display: 'flex' }}>
        <Menu
          onClick={handleActiveRace}
          style={{ width: 256 }}
          selectedKeys={[current]}
          mode='inline'
          items={items}
        />
        <div className='races-detail-content' style={{ flex: 1, marginLeft: 20 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RaceDetail;
